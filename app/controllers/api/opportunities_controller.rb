require_relative '../concerns/devise_controller_patch.rb'
class Api::OpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :set_opportunity, only: [:show, :update, :destroy]
  before_action :authenticate_user

  after_action :verify_authorized, except: [:index, :userIndex]
  after_action :verify_policy_scoped, only: :index

  def index
    if params[:network_id].empty?
      @opportunities = policy_scope(Opportunity)
        .where.not(status: 'Deleted')
    else
      @opportunities = policy_scope(Opportunity)
        .where(opportunity_networks: { network_id: params[:network_id]})
        .where.not(status: 'Deleted')
    end

    render :index
  end

  def userIndex
    @opportunities = @user.opportunities.where.not(status: 'Deleted')
    render :index
  end

  def show
    authorize @opportunity
    @networks = @opportunity.networks.pluck(:id)
    render :show
  end

  def create
    @opportunity = Opportunity.new(opportunity_params
      .merge({owner_id: @user.id, status: "Pending"}))
    authorize @opportunity

    if @opportunity.save
      @opportunity.reset_networks(params[:opportunity][:networks])
      @networks = @opportunity.networks.pluck(:id)
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
      @opportunity.reset_networks(params[:opportunity][:networks])
      @networks = @opportunity.networks.pluck(:id)
      # render json: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    @opportunity[:status] = "Deleted"
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

    # Only allow a trusted parameter "white list" through.
    def opportunity_params
      # debugger
      if params[:opportunity][:picture] == "delete"
        opp_params = params.require(:opportunity).permit(:title, :description,
          :owner_id, :opportunity_need, :value, :status,
          :industries, :geography)
      else
        opp_params = params.require(:opportunity).permit(:title, :description,
          :owner_id, :opportunity_need, :value, :status, :picture,
          :industries, :geography)
      end

      [:geography, :industries].each do |field|
        opp_params[field] = opp_params[field].split(',')
      end

      opp_params
    end
end
