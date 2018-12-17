class Api::WaitlistUsersController < ApiController
  before_action :require_signed_out!, only: [:create]

  def create
    @waitlist_user = WaitlistUser.new(waitlist_user_params)

    if @waitlist_user.save!
      render json: ['Successfully added user to waitlist'], status: 201
    else
      render json: @waitlist_user.errors.full_messages, status: 422
    end
  end

  private

  def waitlist_user_params
    params.permit(:email, :name);
  end
end
