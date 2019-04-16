require_relative '../concerns/devise_controller_patch.rb'
class Api::PassedOpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  # before_action :set_site_template, only: [:show]
  # after_action :verify_authorized, except: :show

  def index
    @passed_opportunity_ids = PassedOpportunity.where(user_id: @user.id).pluck(:opportunity_id)
    @opportunities = Opportunity.where(id: @passed_opportunity_ids)
    render :index
  end

  def create
    @passed_opportunity = PassedOpportunity.find_by(passed_opp_params) ||
      PassedOpportunity.new(passed_opp_params)
    if @passed_opportunity.save
      @opportunity = Opportunity.find(params[:opportunity_id])
      render :show
    else
      render json: @passed_opportunity.errors.full_messages, status: 422
    end
  end

  def destroy
    @passed_opportunity = PassedOpportunity.where(
      opportunity_id: params[:opportunity_id], user_id: @user.id) 
    if @passed_opportunity.destroy_all
      render json: ['Success'], status: 200
    else
      render json: @passed_opportunity.errors.full_messages, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_site_template
    #   @site_template = Network.find(params[:network_id]).site_template
    # end
    def passed_opp_params
      # passed_opp = params.require(:network).per
      { user_id: @user.id, opportunity_id: params[:opportunity_id] }
    end
end
