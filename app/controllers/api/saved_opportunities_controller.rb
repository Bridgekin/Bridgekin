require_relative '../concerns/devise_controller_patch.rb'
class Api::SavedOpportunitiesController < ApiController
  # include DeviseControllerPatch
  before_action :set_saved_opportunity, only: [:show, :update, :destroy]

  def index
    @finalized_opportunities = @user.saved_opportunities

    render :index
  end

  # GET /opportunities/1
  def show
    render :show
  end

  # POST /opportunities
  def create
    @saved_opportunity = SavedOpportunity.new(saved_opportunity_params)

    if @saved_opportunity.save
      # render json: @saved_opportunity, status: :created, location: @saved_opportunity
      render :show
    else
      render json: @saved_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    if @saved_opportunity.update(saved_opportunity_params)
      # render json: @saved_opportunity
      render :show
    else
      render json: @saved_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    if @saved_opportunity.destroy
      render json: ['Saved opportunity was destroyed'], status: :ok
    else
      render json: @saved_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_saved_opportunity
      @saved_opportunity = SavedOpportunity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def saved_opportunity_params
      params.permit(:opportunity_id, :user_id, :facilitator_id,
        :network_id)
    end
end
