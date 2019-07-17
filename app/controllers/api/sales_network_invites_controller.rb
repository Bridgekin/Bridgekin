class Api::SalesNetworkInvitesController < ApiController
  before_action :authenticate_user, except: [:show_by_referral_code]
  before_action :set_network, except: [:show_by_referral_code]
  # before_action :confirm_is_network_admin
  before_action :get_network_admins

  def confirm_is_network_admin
    head :unauthorized if @sales_network.nil? || @sales_network.admins.where(id: @current_user).length == 0
  end

  def get_network_admins
    @admin_map = @sales_network.nil? ? {} : Hash[@sales_network.id => @sales_network.admins.pluck(:id)]
  end

  def index
    render :index
  end

  def show_by_referral_code
    @sales_network_invite = SalesNetworkInvite.includes(:network).find_by(link_code: params[:link_code])

    @sales_network = @sales_network_invite.network
    render :show
  end

  def create
    new_invites = SalesNetworkInvite.prep_batch_create(params[:new_invites], @current_user.id, params[:network_id])
    begin
      @invites = SalesNetworkInvite.create!(new_invites)
      @invites.each{|invite| SalesMailer.send_network_invitation_email(invite, @current_user).deliver_later}

      render json: ["Success"], status: 200
    rescue => exception
      render json: exception.record.errors.full_messages, status: 422
    end
  end

  private

  def set_network
    @sales_network = SalesNetwork.find(params[:network_id])
  end

  # def network_invite_params
  #   @passed_invites = params.require(:new_invites).permit(:email, :fname, :lname,
  # end
end
