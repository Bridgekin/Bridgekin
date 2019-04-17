require_relative '../concerns/devise_controller_patch.rb'
require_relative '../../models/concerns/notification_router.rb'
class Api::ConnectionsController < ApiController
  include DeviseControllerPatch
  include NotificationRouter
  before_action :authenticate_user
  before_action :set_connection, only: [:show, :update, :destroy]
  # after_action :verify_authorized, except: :show

  def index
    @connections = @user.connections.includes(:requestor, :recipient)
    render :index
  end

  def show
    render :show
  end

  def create
    # Find target user, find current user
    friend = User.find(params[:connection][:friend_id])
    inputted_email = params[:connection][:email].downcase
    # Check if provided email is the same (downcased)

    if (params[:connection][:friend_id] === @user.id)
      render json: ["Can't invite yourself"], status: 422
    elsif friend.email.downcase == inputted_email
      @connection = Connection.new(connection_params
        .merge({ user_id: @user.id}))
      # debugger
      if @connection.save
        send_connection_notification(@connection, @user, friend)
        render :show
      else
        render json: @connection.errors.full_messages, status: 422
      end
    else
      render json: ["Provided email doesn't match #{friend.fname.capitalize}'s email"], status: 422
    end
  end

  def update
    if @connection.update(connection_params)
      render :show
    else
      render json: @connection.errors.full_messages, status: 422
    end
  end

  def destroy
    if @connection.destroy
      render json: ["Successfully removed connection"], status: 200
    else
      render json: @connection.errors.full_messages, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_connection
      @connection = Connection.includes(:requestor, :recipient)
        .find(params[:id])
        # .where(id: params[:id]).first
    end

    def connection_params
      params.require(:connection).permit(:friend_id, :status)
    end
end
