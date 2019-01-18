require_relative '../concerns/devise_controller_patch.rb'
class Api::ReferralLinksController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user

  after_action :verify_authorized, except: :index
  # after_action :verify_policy_scoped, only: :index

  def create
    @link = ReferralLink.where(
      member_id: @user.id,
      network_id: params[:referral][:network_id]
    ).first

    if @link
      authorize @link
      render :show
    else
      @link = ReferralLink.new(
        member_id: @user.id,
        network_id: params[:referral][:network_id]
      )
      authorize @link
      if @link.save
        render :show
      else
        render json: @link.errors.full_messages, status: 422
      end
    end
  end

  def reveal
    @link = ReferralLink.find_by(referral_code: params[:referral_code])

    if @link
      render :reveal
    else
      ender json: ['invalid referral link'], status: :unprocessable_entity
    end
  end

  private

  def referral_params
    params.permit(:member_id, :network_id, :referral_code)
  end
end
