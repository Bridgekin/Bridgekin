require_relative '../concerns/devise_controller_patch.rb'
class Api::EmailTemplatesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_notifications
  # after_action :verify_authorized, except: :show

  def show
    # @notifications = Notification.retrieve_notifications(@user)
    if params[:type] == "waitlist_referral"

    if params[:type] == "waitlist_referral"
    @template = EmailTemplate.find_by(type: params[:type])
    render :show
  end

  def waitlist_referral
    existing_user = User.find_by(email: waitlist_user_params[:email])
    existing_waitlist_user = WaitlistUser.find_by(email: waitlist_user_params[:email])

    if existing_user
      render json: ["That email is already associated with an existing Bridgekin member"], status: 422
    elsif existing_waitlist_user
      @template = EmailTemplate.find_by(type: "waitlist_referral_existing")
      render :show
    else
      @template = EmailTemplate.find_by(type: "waitlist_referral_new")
      render :show
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def notification_params
    #   params.require(:notification_setting).permit(:recipient_id,
    #   :actor_id, :action, :acted_with_type, :acted_with_id,
    #   :targetable_type, :targetable_id, :read_at)
    # end

    # def set_notifications
    #   @notifications = @user.notifications.includes(:actor)
    # end
end
