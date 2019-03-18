require_relative '../concerns/devise_controller_patch.rb'
class Api::CirclesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_circle, only: [:show, :update, :destroy]
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
    @circleMemberIds = @circle.user_circles.pluck(:member_id)
    render :show
  end

  def create
    @circle = Circle.new(circle_params
      .merge({ owner_id: @user.id}))
    if @circle.save
      @circle.fill_with_members(params[:circle][:members])
      @circleMemberIds = @circle.user_circles.pluck(:member_id)
      render :show
    else
      render json: @circle.errors.full_messages, status: 422
    end
  end

  def add_member
    @user_circle = UserCircle.new(
      circle_id: params[:circle_id],
      member_id: params[:member_id]
    )
    if @user_circle.save
      @circle = Circle.includes(:user_circles)
        .find(params[:circle_id])
      @circleMemberIds = @circle.user_circles.pluck(:member_id)

      render :member
    else
      render json: @user_circle.errors.full_messages, status: 422
    end
  end

  def remove_member
    @user_circle = UserCircle.find_by(
      circle_id: params[:circle_id],
      member_id: params[:member_id]
    )
    if @user_circle.destroy
      @circle = Circle.includes(:user_circles)
        .find(params[:circle_id])
      @circleMemberIds = @circle.user_circles.pluck(:member_id)

      render :member
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
      @circle = Circle.includes(:members, :user_circles)
        .where(id: [params[:id], params[:circle_id]]).first
    end

    def circle_params
      params.require(:circle).permit(:title)
    end
end
