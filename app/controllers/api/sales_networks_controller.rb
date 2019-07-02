class Api::SalesNetworksController < ApiController
  def index
    @sales_networks = SalesNetwork.where("LOWER(title) LIKE ?" , "%" + params[:title].downcase + "%")

    render :index
  end
end
