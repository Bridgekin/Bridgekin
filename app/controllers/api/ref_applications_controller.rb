require_relative '../concerns/devise_controller_patch.rb'
class Api::RefApplicationsController < ApiController
  include DeviseControllerPatch
  before_action :set_ref_application, only: [:show,
  :update, :destroy]
  before_action :authenticate_user

  def index
    @owned_applications = RefApplication.where(ref_opp_id: @user.ref_opportunities.pluck(:id))
    @submitted_applications = @user.ref_applications

    @ref_applications = @owned_applications + @submitted_applications
    render :index
  end
  
  def show
    render :show
  end

  def create
    @ref_application = RefApplication.new(ref_application_params)
    if @ref_application.save
      render :show
    else
      render json: @ref_application.errors.full_messages,status: 401
    end
  end

  def update
    if @ref_application.update(ref_application_params)
      render :show
    else
      render json: @ref_application.errors.full_messages,status: 401
    end
  end

  def destroy
    if @ref_application.destroy
      render :json, ['Deleted'], status: 200
    else
      render json: @ref_application.errors.full_messages,status: 401
    end
  end

  private

  def ref_application_params
    params.require(:ref_application).permit(:fname,
      :lname, :email, :referral_code, :ref_opp_id,
      :direct_referrer_id, :candidate_id, :question_1,
      :answer_1)
  end

  def set_ref_application
    @ref_application = RefApplication.find(params[:id])
  end
end
