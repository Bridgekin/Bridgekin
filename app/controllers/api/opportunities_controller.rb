require_relative '../concerns/devise_controller_patch.rb'
class Api::OpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :set_opportunity, only: [:show, :update, :destroy]
  before_action :authenticate_user

  def index
    @opportunities = Opportunity.joins(:opportunity_networks)
      .where("opportunity_networks.network_id = #{params[:network_id]}")

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
    @networks = @opportunity.networks
    render :show
  end

  # POST /opportunities
  def create
    @opportunity = Opportunity.new(opportunity_params)
    @opportunity.owner_id = @user.id
    @opportunity.status = 'Pending'

    if @opportunity.save
      networks_params = params[:opportunity][:networks]
      @opportunityNetworks = []
      networks_params.each do |id|
        @opportunityNetworks << OpportunityNetwork.create(
          opportunity_id: @opportunity.id,
          network_id: id
        )
      end

      @networks = @opportunity.networks
      # render json: @opportunity, status: :created, location: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    if @opportunity.update(opportunity_params)
      @networks = @opportunity.networks
      # render json: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    if @opportunity.destroy
      render json: ['Opportunity was destroyed'], status: :ok
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # def opportunity
  #   @opporunities = @user.opportunities
  #   @connected_opporunities = @user.opportunities
  #   @opporunities = @user.opportunities
  #   @opporunities = @user.opportunities
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opportunity
      @opportunity = Opportunity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def opportunity_params
      params.require(:opportunity).permit(:title, :description,
        :owner_id, :opportunity_needs,  :value, :status,
        :industries => [], :geography => [])
    end
end
