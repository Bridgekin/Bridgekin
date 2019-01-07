require_relative '../concerns/devise_controller_patch.rb'
class Api::NetworksController < ApplicationController
  include DeviseControllerPatch
  before_action :set_network, only: [:show, :update, :destroy]
  before_action :authenticate_user

  def index
    @networks = @user.member_networks
    render :index
  end

  # GET /opportunities/1
  def show
    render :show
  end

  # POST /opportunities
  def create
    @network = Network.new(network_params)

    if @network.save
      render :show
    else
      render json: @network.errors.full_messages, status: 422
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_network
      @network = Network.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def network_params
      params.require(:network).permit(:title, :description, :owner_id, :opportunity_needs,
      :industries, :geography, :value, :status, :networks)
    end
end
