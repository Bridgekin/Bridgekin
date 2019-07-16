class Api::SalesNetworkInvitesController < ApiController
  before_action :authenticate_user
  before_action :set_network
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

  def create
    debugger

    render 
  end

  private

  def set_network
    @sales_network = SalesNetwork.find(params[:network_id])
  end
end
