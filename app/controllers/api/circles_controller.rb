require_relative '../concerns/devise_controller_patch.rb'
class Api::CirclesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_circles, only: [:show, :update, :destroy,
    :add_member, :remove_member]
  # after_action :verify_authorized, except: :show

  def index
    @circles = @user.circles.includes(:members)

    @circleMemberIds = @circles.reduce({}) do |acc, circle|
      acc[circle.id] = circle.user_circles.pluck(:member_id)
      acc
    end

    render :index
  end

  def show
    render :show
  end

  def create
    @circle = Circle.new(circle_params
      .merge({ owner_id: @user.id}))
    if @circle.save
      render :show
    else
      render json: @circle.errors.full_messages, status: 422
    end
  end

  def add_member
    @user_circle = UserCircle.new(
      circle_id: params[:id],
      member_id: params[:member_id]
    )
    if @user_circle.save
      render :member
    else
      render json: @user_circle.errors.full_messages, status: 422
    end
  end

  def remove_member
    @user_circle = UserCircle.find_by(
      circle_id: params[:id],
      member_id: params[:member_id]
    )
    if @user_circle.destroy
      render :member
    else
      render json: @user_circle.errors.full_messages, status: 422
    end
  end

  def update
    if @circle.update(circle_params)
      render :show
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
      @circle = Circle.includes(:members)
        .where(id: params[:id]).first
    end

    def circle_params
      params.require(:connection).permit(:title)
    end
end
