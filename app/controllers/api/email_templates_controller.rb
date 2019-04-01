require_relative '../concerns/devise_controller_patch.rb'
class Api::EmailTemplatesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  # before_action :set_notifications
  # after_action :verify_authorized, except: :show

  def show
    # @notifications = Notification.retrieve_notifications(@user)
    @template = EmailTemplate.find_by(template_type: params[:template_type])
    render :show
  end

  def waitlist_referral
    existing_user = User.find_by(email: params[:email])
    existing_waitlist_user = WaitlistUser.find_by(email: params[:email])

    if params[:email] == ''
      render json: ["Email is blank"], status: 422
    elsif existing_user
      render json: ["That email is already associated with an existing Bridgekin member"], status: 422
    elsif existing_waitlist_user
      @template = EmailTemplate.find_by(template_type: "waitlist_referral_existing")
      render :show
    else
      @template = EmailTemplate.find_by(template_type: "waitlist_referral_new")
      render :show
    end
  end

  def connected_opportunity
    owner = Opportunity.find(params[:opp_id]).owner
    connection = Connection.where(user_id: @user.id, friend_id: owner.id, status: "Accepted")
      .or(Connection.where(user_id: owner.id, friend_id: @user.id, status: "Accepted"))

    if params[:connect_bool] && !connection.empty?
      @template = EmailTemplate.find_by(template_type: "connected_opportunity_with_connection")
    elsif params[:connect_bool] && connection.empty?
      @template = EmailTemplate.find_by(template_type: "connected_opportunity_no_connection")
    elsif !params[:connect_bool] && !connection.empty?
      @template = EmailTemplate.find_by(template_type: "facilitated_opportunity_with_connection")
    elsif !params[:connect_bool] && connection.empty?
      @template = EmailTemplate.find_by(template_type: "facilitated_opportunity_no_connection")
    end
    render :show
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
