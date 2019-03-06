require_relative '../concerns/devise_controller_patch.rb'
class Api::ConnectionsController < ApiController
  include DeviseControllerPatch
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
    @connection = Connection.new(connection_params)
    if @connection.save
      render :show
    else
      render json: @connection.errors.full_messages, status: 422
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
        .where(id: params[:id]).first
    end

    def connection_params
      params.require(:connection).permit(:friend_id, :status)
    end
end
