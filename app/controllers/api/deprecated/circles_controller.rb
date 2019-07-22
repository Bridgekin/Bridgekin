require_relative '../concerns/devise_controller_patch.rb'
class Api::CirclesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_circle, only: [:show, :update, :destroy]
  # after_action :verify_authorized, except: :show

  def index
    @circles = @user.circles.includes(:connections)

    @circle_connections = @user.circle_connections
    @connections = @user.connections_for_circles

    # @circle_connections = @circles.map{|circle| circle.}
    # @circleMemberIds = @circles.reduce({}) do |acc, circle|
    #   acc[circle.id] = circle.user_circles.pluck(:member_id)
    #   acc
    # end

    render :index
  end

  def show
    # @circleMemberIds = @circle.user_circles.pluck(:member_id)
    @circle_connections = @circle.circle_connections
    @connections = @circle.connections
    render :show
  end

  def create
    @circle = Circle.new(circle_params
      .merge({ owner_id: @user.id}))
    if @circle.save
      @circle.fill_with_connections(params[:circle][:connection_ids])
      # @circleMemberIds = @circle.user_circles.pluck(:member_id)

      @circle_connections = @circle.circle_connections
      @connections = @circle.connections
      render :show
    else
      render json: @circle.errors.full_messages, status: 422
    end
  end

  def add_member
    @circle_connection = CircleConnection.new(
      circle_id: params[:circle_id],
      connection_id: params[:connection_id]
    )
    if @circle_connection.save
      # @circleMemberIds = @circle.user_circles.pluck(:member_id)
      # @circle = Circle.includes(:circle_connections, :connections)
      #   .find(params[:circle_id])
      # @circle_connections = @circle.circle_connections
      # @connections = @circle.connections

      render :member
    else
      render json: @user_circle.errors.full_messages, status: 422
    end
  end

  def remove_member
    @circle_connection = CircleConnection.find(params[:circle_connection_id])
    # debugger
    if @circle_connection.destroy
      # @circle = Circle.includes(:circle_connections, :connections)
      #   .find(params[:circle_id])
      # @circle_connections = @circle.circle_connections
      # @connections = @circle.connections

      render json: ["Success"], status: 200
    else
      render json: @user_circle.errors.full_messages, status: 422
    end
  end

  def update
    if @circle.update(circle_params)
      render :update
    else
      render json: @circle.errors.full_messages, status: 422
    end
  end

  def destroy
    if @circle.destroy
      render json: ["Successfully deleted the circle"], status: 200
    else
      render json: @circle.errors.full_messages, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_circle
      @circle = Circle.includes(:connections, :circle_connections)
        .where(id: [params[:id], params[:circle_id]]).first
    end

    def circle_params
      params.require(:circle).permit(:title)
    end
end
