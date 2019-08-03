class Api::SalesInvitesController < ApiController
  before_action :authenticate_user, except: [:show_by_referral_code]
  before_action :set_network, only: [:index]
  before_action :set_invite, only: [:update, :destroy]
  before_action :get_network_admins, only: [:index]
  # before_action :confirm_is_network_admin

  def confirm_is_network_admin
    head :unauthorized if @sales_network.nil? || @sales_network.admins.where(id: @current_user).length == 0
  end

  def get_network_admins
    if @sales_network
      @admin_map = @sales_network.nil? ? {} : Hash[@sales_network.id => @sales_network.admins.pluck(:id)]
    end
  end

  def index
    if params[:permissable_type] == "SalesNetwork"
      @sales_invites = @sales_network.sales_invites
    else
      @sales_invites = @current_user.sent_network_invites
    end
    render :index
  end

  def show_by_referral_code
    @sales_invite = SalesInvite.includes(:network).find_by(link_code: params[:link_code])

    @sales_network = @sales_invite.network
    render :show
  end

  def create
    formatted_invites = params[:new_invites].reduce([]){|acc, invite| acc << invite.permit(:email, :fname,:lname, :user_type).to_h}
    current_dashboard_target = params[:current_dashboard_target]

    new_invites = SalesInvite.prep_batch_create(formatted_invites, @current_user, current_dashboard_target)
    begin
      raise ArgumentError if new_invites.nil?
      @sales_invites = SalesInvite.create!(new_invites)
      @sales_invites.each{|invite| SalesMailer.send_network_invitation_email(invite, @current_user).deliver_later}

      render :create, status: 200
    rescue ArgumentError => e
      render json: ["No invites created"], status: 404
    rescue => exception
      render json: exception.record.errors.full_messages, status: 422
    end
  end

  def update
    # debugger
    @sales_invite.update!(user_type: params[:user_type])
    @sales_user_permission = @sales_invite.user_permission
    @sales_user_permission.update!(member_type: params[:user_type]) if @sales_user_permission
    render :show
  rescue => e 
    render json: e.message, status: 404
  end

  def destroy
    # debugger
    @sales_user_permission = @sales_invite.user_permission
    @sales_invite.destroy!
    @sales_user_permission.destroy! if @sales_user_permission
    render json: ["Success"]
  rescue => e
    # debugger
    render json: e.message, status: 404
  end

  private

  def set_network
    if params[:permissable_type] == "SalesNetwork"
      @sales_network = SalesNetwork.find(params[:permissable_id])
    end
  end

  def set_invite
    @sales_invite = SalesInvite.find(params[:id]) if params[:id]
  end

  # def network_invite_params
  #   @passed_invites = params.require(:new_invites).permit(:email, :fname, :lname,
  # end
end
