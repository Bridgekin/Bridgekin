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
    else
      @opportunities = policy_scope(Opportunity)
        .where(opportunity_networks: { network_id: params[:network_id]} )
    end

    render :index
  end

  def userIndex
    # @opportunities = Opportunity.joins(:opportunity_networks)
    #   .where(owner_id: @user.id)
    #   .where("opportunity_networks.network_id = #{params[:network_id]}")
    @opportunities = @user.opportunities
    render :index
  end

  # GET /opportunities/1
  def show
    authorize @opportunity
    @networks = @opportunity.networks.pluck(:id)
    render :show
  end

  # POST /opportunities
  def create
    @opportunity = Opportunity.new(opportunity_params)
    @opportunity.owner_id = @user.id
    @opportunity.status = 'Pending'

    authorize @opportunity

    if @opportunity.save
      networks_params = params[:opportunity][:networks].split(',')
      @opportunityNetworks = []
      networks_params.each do |id|
        @opportunityNetworks << OpportunityNetwork.create(
          opportunity_id: @opportunity.id,
          network_id: id
        )
      end

      @networks = @opportunity.networks.pluck(:id)
      # render json: @opportunity, status: :created, location: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    authorize @opportunity

    # debugger

    if @opportunity.update(opportunity_params)
      @opportunity.picture.purge if params[:opportunity][:picture] == "delete"

      @opportunity.opportunity_networks.delete_all

      networks_params = params[:opportunity][:networks].split(',')
      @opportunityNetworks = []
      networks_params.each do |id|
        @opportunityNetworks << OpportunityNetwork.create(
          opportunity_id: @opportunity.id,
          network_id: id
        )
      end

      @networks = @opportunity.networks.pluck(:id)
      # render json: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    authorize @opportunity
    if @opportunity.destroy
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

      opp_params[:geography] = opp_params[:geography].split(',')
      opp_params[:industries] = opp_params[:industries].split(',')

      opp_params
    end
end
