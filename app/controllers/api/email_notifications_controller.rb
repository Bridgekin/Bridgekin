require_relative '../concerns/devise_controller_patch.rb'
class Api::EmailNotificationsController < ApiController
  include DeviseControllerPatch
  before_action :set_email_notification, only: [:show, :destroy]
  before_action :authenticate_user

  def index
    @email_notification = @user.notification_setting
    unless @email_notification
      @email_notification = EmailNotification.create(user_id: @user.id)
    end
    render :show
  end

  def create
    @email_notification = @user.notification_setting

    if @email_notification
      if @email_notification.update(email_notification_params)
        render :show
      else
        render json: @email_notification.errors.full_messages, status: 422
      end
    else
      @email_notification = EmailNotification.new(email_notification_params)
      @email_notification.user_id = @user.id

      if @email_notification.save
        render :show
      else
        render json: @email_notification.errors.full_messages, status: 422
      end
    end
  end

  # def update
  #   if @email_notification.update(email_notification_params)
  #     render :show
  #   else
  #     render json: @email_notification.errors.full_messages, status: 422
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_email_notification
      @email_notification = EmailNotification.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def email_notification_params
      params.require(:email_notification).permit(:notification_setting)
      # params.permit(:notification_setting)
    end

end
