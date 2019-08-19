class Api::SalesInvitesController < ApiController
  before_action :authenticate_user, except: [:show_by_referral_code, :confirm_sales_invite, :confirm_invite_update]
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
    # debugger
    if params[:permissable_type] == "SalesNetwork"
      @sales_invites = @sales_network.sales_invites
    else
      @sales_invites = @current_user.personal_invites
    end
    render :index
  end

  def show_by_referral_code
    @sales_invite = SalesInvite.includes(:network).find_by(link_code: params[:link_code])

    @sales_network = @sales_invite.network
    render :show
  end

  def create
    formatted_invites = params[:new_invites].reduce([]){|acc, invite| acc << invite.permit(:email, :fname,:lname, :relationship).to_h}
    current_dashboard_target = params[:current_dashboard_target]

    sales_invites = SalesInvite.prep_batch_create(formatted_invites, @current_user, current_dashboard_target)

    @sales_invites = SalesInvite.save_batch(sales_invites, @current_user)

    if @sales_invites.is_a?(String)
      render json:[@sales_invites], status: 404
    else
      render :create, status: 200
    end
  end

  def confirm_sales_invite
    @sales_invite = SalesInvite.includes(:network, :recipient, :sender, :user_permission).find_by(link_code: params[:code])
    new_rel = @sales_invite.relationship

    SalesInvite.confirm_invite(@sales_invite)

    redirect_to "#{root_url}sales/permission_confirmed?rel=#{new_rel}"
  rescue => e 
    render json: e.message, status: 404
  end

  def update
    new_rel = params[:relationship]
    sales_user_permission = @sales_invite.user_permission

    if sales_user_permission
      SalesInvite.update_invite(@sales_invite, new_rel, @current_user)
    else
      @sales_invite.update!(relationship: new_rel)
    end
  
    render :show
  rescue => e 
    render json: e.message, status: 404
  end

  def confirm_invite_update
    @sales_invite = SalesInvite.includes(:network, :recipient, :sender, 
      :user_permission)
      .find_by(link_code: params[:code])
    new_rel = @sales_invite.relationship
    
    SalesInvite.confirm_invite_update(@sales_invite, new_rel)

    redirect_to "#{root_url}sales/permission_confirmed?rel=#{new_rel}"
  rescue => e 
    render json: e.message, status: 404
  end

  def destroy
    # debugger
    SalesInvite.delete_invite(@sales_invite)
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
    @sales_invite = SalesInvite.includes(:user_permission)
      .find(params[:id]) if params[:id]
  end

  # def network_invite_params
  #   @passed_invites = params.require(:new_invites).permit(:email, :fname, :lname,
  # end
end
