require_relative '../concerns/devise_controller_patch.rb'
class Api::MemberUsersController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_network, except: [:add_by_referral]
  before_action :set_user, only: [:create, :destroy]
  # after_action :verify_authorized, except: :show

  def index
    @member_users = @network.members
    render :index
  end

  def create
    permission = UserNetwork.new(
      network_id: @network.id, member_id: params[:id] )

    if permission.save
      render :show
    else
      render json: permission.errors.full_messages, status: 422
    end
  end

  def add_by_referral
    @referralLink = ReferralLink.find_link_by_code(params[:referral_code])
    @user = User.find(params[:id])

    if @referralLink && @user && @referralLink[:status] == 'Active'
      @network = @referralLink.network
      permission = UserNetwork.new(
        network_id: @network.id, member_id: params[:id] )

      if permission.save
        @referralLink.consume_charge(@user.id)
        render :show
      else
        render json: permission.errors.full_messages, status: 422
      end

    elsif @referralLink.nil?
      render json: ["Invalid referral link"], status: 401
    elsif @referralLink[:status] != "Active"
      render json: ["Referral link has already been claimed"], status: 401
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    permission = @network.user_networks.where(member_id: params[:id])[0]

    if permission.destroy
      render json: ["User removed from network"]
    else
      render json: permission.errors.full_messages, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_network
      @network = Network.find(params[:network_id])
    end

    def set_user
      @user = User.find(params[:id])
    end
end
