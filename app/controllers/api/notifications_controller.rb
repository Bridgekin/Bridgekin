require_relative '../concerns/devise_controller_patch.rb'
class Api::NotificationsController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_notifications
  # after_action :verify_authorized, except: :show

  def index
    # @notifications = Notification.retrieve_notifications(@user)
    render :index
  end

  def read_all
    # @notifications = Notification.where(recipient_id: @user.id, read_at: nil)
    #   .update_all(read_at: DateTime.now)
    if params[:notification_ids]
      Notification.where(id: params[:notification_ids])
        .update_all(read_at: DateTime.now)

      render :index
    else
      render json: ["Didn't send ids to update"], status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def notification_params
      params.require(:notification_setting).permit(:recipient_id,
      :actor_id, :action, :acted_with_type, :acted_with_id,
      :targetable_type, :targetable_id, :read_at)
    end

    def set_notifications
      @notifications = @user.notifications.includes(:actor)
    end
end
