require_relative '../concerns/devise_controller_patch.rb'
require_relative '../concerns/sql_controller_module.rb'
class Api::OpportunitiesController < ApiController
  include DeviseControllerPatch
  include SQLControllerModule
  before_action :set_opportunity, only: [:show, :update, :destroy]
  before_action :authenticate_user
  before_action :set_workspace_networks, only: [:index]

  after_action :verify_authorized, except: [:index, :userIndex]
  # after_action :verify_policy_scoped, only: :index

  def index
    option = params[:option].split('-')
    @opportunities = []
    if option.empty?
      @opportunities = opps_all_networks + opps_all_connections + opps_all_circles
    else
      if option.first == 'All'
        case option.last
        when 'Network'
          @opportunities = opps_all_networks
        when 'Connection'
          @opportunities = opps_all_connections
        when 'Circle'
          @opportunities = opps_all_circles
        else
          render json: ["Houston, we have a problem"], status: 422
        end
      elsif option.first == 'Direct'
        # Only for Direct Connections
        @opportunities = opps_direct_connections
      else
        if option.last == 'Network'
          # For Networks by ID
          @opportunities = opps_network_id(option.first)
        elsif option.last == 'Circle'
          @opportunities = opps_circle_id(option.first)
        end
      end
    end

    # Sory by DESC
    @opportunities = @opportunities.sort{|a,b| b.created_at <=> a.created_at}
    @networkOpps = @opportunities.pluck(:id)

    render :index
  end

  def userIndex
    @opportunities = @user.opportunities
      .includes(:owner)
      .where.not(deal_status: 'Deleted')
      .order(created_at: :desc)

    @userOpportunities = @opportunities.pluck(:id)
    render :userIndex
    # .includes(:networks)
    # .includes(:opp_permissions)
  end

  def show
    authorize @opportunity
    @networks = @opportunity.networks.pluck(:id)
    render :show
  end

  def create
    @opportunity = Opportunity.new(opportunity_params
      .merge({owner_id: @user.id, status: "Approved", deal_status:'Active'}))
    authorize @opportunity

    if @opportunity.save
      @opportunity.set_permissions(params[:opportunity][:permissions])

      # Send email to joe
      OpportunityMailer.flag_opportunity_creation(@opportunity, @user).deliver_now
      # render json: @opportunity, status: :created, location: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    authorize @opportunity

    if @opportunity.update(opportunity_params)
      @opportunity.picture.purge if params[:opportunity][:picture] == "delete"
      @opportunity.set_permissions(params[:opportunity][:permissions]) if params[:opportunity][:permissions]

      @networks = @opportunity.networks.pluck(:id)
      # render json: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    @opportunity[:deal_status] = "Deleted"
    authorize @opportunity
    if @opportunity.save
      render json: ['Opportunity was destroyed'], status: :ok
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opportunity
      @opportunity = Opportunity.find(params[:id])
    end

    def set_workspace_networks
      @workspace_networks = Network.where(workspace_id: params[:workspace_id])
        .where(id: @user.member_networks)
        .or(Network.where(id: params[:workspace_id]))
        .includes(:opportunities)

      @workspace_network_members = User.joins(:user_networks)
        .where(user_networks: { network_id: @workspace_networks.pluck(:id)})
      # @workspace_connections = @user.friends.joins(:user_networks)
      #   .where(user_networks: { network_id: @workspace_networks.pluck(:id) })
    end

    # Only allow a trusted parameter "white list" through.
    def opportunity_params
      # debugger
      if params[:opportunity][:picture] == "delete"
        opp_params = params.require(:opportunity).permit(:title, :description,
          :owner_id, :opportunity_need, :value, :anonymous, :view_type,
          :deal_status, :industries, :geography)
      else
        opp_params = params.require(:opportunity).permit(:title, :description,
          :owner_id, :opportunity_need, :value, :picture, :anonymous, :view_type,
          :deal_status, :industries, :geography)
      end

      [:geography, :industries ].each do |field|
        opp_params[field] = opp_params[field].split(',') unless opp_params[field].nil?
      end
      opp_params[:anonymous] = params[:opportunity][:anonymous] == 'true' unless params[:opportunity][:anonymous].nil?

      opp_params
    end
end
