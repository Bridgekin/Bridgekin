require_relative '../concerns/devise_controller_patch.rb'
class Api::RefApplicationsController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user, except: [:request_demo]
  before_action :set_ref_application, only: [:show,
  :update, :destroy]

  def index
    owned_opps = @user.ref_opportunities
    @owned_applications = RefApplication.includes(:ref_opp).where(ref_opp_id: owned_opps.pluck(:id))
    @submitted_applications = @user.submitted_apps
      .includes(:ref_opp)

    @ref_applications = @owned_applications + @submitted_applications

    submitted_opps = @submitted_applications.map do |app|
      app.ref_opp
    end if @submitted_applications

    @ref_opps = owned_opps + submitted_opps
    render :index
  end
  
  def show
    render :show
  end

  def create
    @ref_application = RefApplication.new(ref_application_params)

    ref_code = params[:ref_application][:referral_code]
    if ref_code && !params[:ref_application][:direct_referrer_id]
      @ref_application.direct_referrer_id = RefOppLink.find_by(link_code: ref_code).owner_id
    end

    if @ref_application.save
      # Send Job owner a notification
      ref_opp = @ref_application.ref_opp
      HiringMailer.notify_job_owner(ref_opp).deliver_later

      # Notify Applicant and Referrer
      @ref_application.notify_parties
      
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

  def update_status
    @ref_application = RefApplication.find(params[:payload][:id])
    prev_status = @ref_application.status
    if @ref_application.update(status: params[:payload][:status])
      # Notify Applicant and Referrer
      @ref_application.notify_parties

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
      :answer_1, :resume, :has_license,
      :allows_screening, :availability, :phone_number)
  end

  def set_ref_application
    @ref_application = RefApplication.find(params[:id])
  end
end
