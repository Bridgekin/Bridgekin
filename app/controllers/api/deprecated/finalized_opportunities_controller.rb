require_relative '../concerns/devise_controller_patch.rb'
class Api::FinalizedOpportunitiesController < ApiController
  # include DeviseControllerPatch
  before_action :set_finalized_opportunity, only: [:show, :update, :destroy]

  def index
    @finalized_opportunities = @user.finalized_opportunities
    @facilitated_finalized_opportunities = @user.facilitated_deals
    render :index
  end

  # GET /opportunities/1
  def show
    render :show
  end

  # POST /opportunities
  def create
    @finalized_opportunity = FinalizedOpportunity.new(finalized_opportunity_params)

    if @finalized_opportunity.save
      # render json: @finalized_opportunity, status: :created, location: @finalized_opportunity
      render :show
    else
      render json: @finalized_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    if @finalized_opportunity.update(finalized_opportunity_params)
      # render json: @finalized_opportunity
      render :show
    else
      render json: @finalized_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    if @finalized_opportunity.destroy
      render json: ['Finalized opportunity was destroyed'], status: :ok
    else
      render json: @finalized_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_finalized_opportunity
      @finalized_opportunity = FinalizedOpportunity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def finalized_opportunity_params
      params.permit(:opportunity_id, :user_id, :facilitator_id,
        :network_id)
    end
end
