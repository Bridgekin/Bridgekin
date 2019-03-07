require_relative '../concerns/devise_controller_patch.rb'
class Api::NetworksController < ApplicationController
  include DeviseControllerPatch
  before_action :set_network, only: [:show, :update, :destroy]
  before_action :authenticate_user

  after_action :verify_authorized, except: [:index, :workspaceIndex]
  after_action :verify_policy_scoped, only: :index

  def index
    @networks = policy_scope(Network)
    render :index
  end

  def workspaceIndex
    @networks = policy_scope(Network)
      .where(workspace_id: params[:network_id])
      .or(policy_scope(Network).where(id: params[:network_id]))

    @workspaceOptions = createShareOptions(@networks, 'Network')

    render :workspaceIndex
  end

  # GET /networks/1
  def show
    authorize @network
    render :show
  end

  # POST /networks
  def create
    @network = Network.new(network_params)
    authorize @network

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
      params.require(:network).permit(:title, :subtitle)
    end
end
