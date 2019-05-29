require_relative '../concerns/devise_controller_patch.rb'
class Api::RefOpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :set_ref_opp, only: [:show, :update, :destroy]

  def show
    render :show
  end

  def create
    @ref_opp = RefOpp.new(ref_opp_params)
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

  def destroy
    if @ref_opp.update(status: 'Deleted')
      render :show
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
    @ref_opp = RefOpp.find(params[:id])
  end
end
