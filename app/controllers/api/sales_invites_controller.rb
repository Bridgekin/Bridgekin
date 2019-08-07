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
      @sales_invites = @current_user.sent_invites
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

    new_user_invites,  existing_user_invites = SalesInvite.prep_batch_create(formatted_invites, @current_user, current_dashboard_target)
    begin
      raise ArgumentError if new_user_invites.nil? ||  existing_user_invites.nil?

      #For new users
      saved_new_user_invites = SalesInvite.create!(new_invites)
      #For existing users
      saved_existing_user_invites = SalesInvite.create!(new_invites)

      @sales_invites = saved_new_user_invites + saved_existing_user_invites
      @sales_invites.each do |invite|
        if invite[:network_id]
          SalesMailer.send_network_invite_email(invite, @current_user).deliver_later
        else
          SalesMailer.send_user_invite_email(invite, @current_user).deliver_later
        end
      end

      render :create, status: 200
    rescue ArgumentError => e
      render json: ["No invites created"], status: 404
    rescue => exception
      render json: exception.record.errors.full_messages, status: 422
    end
  end

  def confirm_sales_invite
    @sales_invite = SalesInvite.includes(:network, :recipient, :sender).find_by(link_code: params[:code])
    @sales_user_permission = @sales_invite.user_permission

    ActiveRecord::Base.transaction do
      unless @sales_user_permission.nil?
        permissable = sales_invite.network || sales_invite.sender
        relationship = sales_invite.relationship
        recipient = sales_invite.recipient

        @sales_user_permission = SalesUserPermission.create!(user: recipient, permissable: permissable, relationship: relationship)

        @sales_invite.update!(user_permission: @sales_user_permission)
      end
      @sales_user_permission.update!(status: "confirmed", last_confirmed: DateTime.now)
    end

    redirect_to "#{root_url}sales/permission_confirmed?rel=#{new_rel}"
  rescue => e 
    render json: e.message, status: 404
  end

  def update
    old_rel = @sales_invite.relationship
    new_rel = params[:relationship]
    @sales_user_permission = @sales_invite.user_permission
    
    if @sales_user_permission
      ActiveRecord::Base.transaction do
        @sales_invite.update!(relationship: new_rel)
        #Change permission to pending
        @sales_user_permission.update!(status: "pending")
        #Notify user of change about to occur
        SalesMailer.confirm_permission_change_email(@sales_invite, @current_use, old_rel, new_rel).deliver_later
      end 
    end
  
    render :show
  rescue => e 
    render json: e.message, status: 404
  end

  def confirm_invite_change
    @sales_invite = SalesInvite.includes(:network, :recipient, :sender).find_by(link_code: params[:code])
    new_rel = @sales_invite.relationship
    @sales_user_permission = @sales_invite.user_permission
    
    @sales_user_permission.update!(relationship: new_rel)

    redirect_to "#{root_url}sales/permission_confirmed?rel=#{new_rel}"
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
