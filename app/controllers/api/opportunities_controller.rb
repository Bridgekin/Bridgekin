require_relative '../concerns/devise_controller_patch.rb'
class Api::OpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :set_opportunity, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:index]

  def index
    @opportunities = @user.opportunities

    render :index
  end

  # GET /opportunities/1
  def show
    render :show
  end

  # POST /opportunities
  def create
    @opportunity = Opportunity.new(opportunity_params)

    if @opportunity.save
      # render json: @opportunity, status: :created, location: @opportunity
      render :show
    else
      render json: @opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    if @opportunity.update(opportunity_params)
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
      params.permit(:title, :description, :owner_id, :opportunity_needs,
      :industries, :geography, :value, :status)
    end
end
