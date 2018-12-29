class Api::OpportunitiesController < ApiController
  before_action :set_opportunity, only: [:show, :update, :destroy]

  # GET /opportunities
  def index
    @opportunities = Opportunity.all

    # render json: @opportunities
    render json: ['it works']
  end

  # GET /opportunities/1
  def show
    render json: @opportunity
  end

  # POST /opportunities
  def create
    @opportunity = Opportunity.new(opportunity_params)

    if @opportunity.save
      render json: @opportunity, status: :created, location: @opportunity
    else
      render json: @opportunity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /opportunities/1
  def update
    if @opportunity.update(opportunity_params)
      render json: @opportunity
    else
      render json: @opportunity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    @opportunity.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opportunity
      @opportunity = Opportunity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def opportunity_params
      params.fetch(:opportunity, {})
    end
end
