require_relative '../concerns/devise_controller_patch.rb'
class Api::ConnectedOpportunitiesController < ApiController
  # include DeviseControllerPatch
  before_action :set_connected_opportunity, only: [:show, :update, :destroy]

  def index
    @connected_opportunities = @user.connected_opportunities
    @facilitated_connected_opportunities = @user.facilitated_opportunities
    render :index
  end

  # GET /opportunities/1
  def show
    render :show
  end

  # POST /opportunities
  def create
    @connected_opportunity = ConnectedOpportunity.new(connected_opportunity_params)

    if @connected_opportunity.save
      # render json: @connected_opportunity, status: :created, location: @connected_opportunity
      render :show
    else
      render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    if @connected_opportunity.update(connected_opportunity_params)
      # render json: @connected_opportunity
      render :show
    else
      render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    if @connected_opportunity.destroy
      render json: ['Connected opportunity was destroyed'], status: :ok
    else
      render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_finalized_opportunity
      @connected_opportunity = ConnectedOpportunity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def connected_opportunity_params
      params.permit(:opportunity_id, :user_id, :facilitator_id,
        :network_id)
    end
end
