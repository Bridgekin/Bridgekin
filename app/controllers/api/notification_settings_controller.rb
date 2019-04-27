require_relative '../concerns/devise_controller_patch.rb'
class Api::NotificationSettingsController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_notification_setting
  # after_action :verify_authorized, except: :show

  def show
    render :show
  end

  def update
    if @notification_setting.update(notification_settings_params)
      render :show
    else
      render json: @notification_setting.errors.full_messages, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def notification_settings_params
      params.require(:notification_setting).permit(:opps_shared_direct,
      :opps_shared_contacts, :opps_shared_communities, :invites_requested,
      :opps_acknowledged, :email_opps_shared_direct,
      :email_opps_shared_contacts, :email_invites_requested,
      :email_recap_shared_communities, :email_recap_shared_contacts)
    end

    def set_notification_setting
      @notification_setting = @user.notification_setting ||
        NotificationSetting.create(user_id: @user.id)
    end
end
