require_relative '../concerns/devise_controller_patch.rb'
class Api::RefOpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user, except: [:show]
  before_action :set_ref_opp, only: [:show, :update, :destroy, :update_status]

  def index
    @ref_opps = @user.ref_opportunities
    @owned_opps = @ref_opps.pluck(:id)
    render :index
  end

  def show
    render :show
  end

  def create
    @ref_opp = RefOpportunity.new(ref_opp_params)
    if @ref_opp.save
      render :show
    else
      render json: @ref_opp.errors.full_messages, status: 401
    end
  end

  def update
    if @ref_opp.update(ref_opp_params)
      render :show
    else
      render json: @ref_opp.errors.full_messages, status: 401
    end
  end

  def update_status
    prev_status = @ref_opp.status
    if @ref_opp.update(ref_opp_params)
      render :show
    else
      render json: @ref_opp.errors.full_messages,status: 401
    end
  end

  def destroy
    if @ref_opp.destroy
      render :json, ['Deleted'], status: 200
    else
      render json: @ref_opp.errors.full_messages, status: 401
    end
  end

  private

  def ref_opp_params
    params.require(:ref_opp).permit(:title, :description,
      :url, :city, :state, :company, :compensation, 
      :interview_incentive, :hire_incentive, :owner_id,
      )
  end

  def set_ref_opp
    @ref_opp = RefOpportunity.find(params[:id])
  end
end
