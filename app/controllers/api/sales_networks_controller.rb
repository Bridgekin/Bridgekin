class Api::SalesNetworksController < ApiController
  before_action :authenticate_user, except: [:search_networks] 

  def index
    @sales_networks = @current_user.sales_networks

    @network_details = SalesNetwork.generate_network_details(@sales_networks)

    render :index
  end

  def search_networks
    @sales_networks = SalesNetwork.includes(:members, :subscriptions, :subscribed_products).where("LOWER(domain) LIKE ?" , "%" + params[:domain].downcase + "%")
    # @search_networks = @sales_networks.pluck(:id)

    @network_details = SalesNetwork.generate_network_details(@sales_networks)

    render :index
  end
end
