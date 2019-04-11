require_relative '../concerns/devise_controller_patch.rb'
class Api::UserMetricsController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  # before_action :set_site_template, only: [:show]
  # after_action :verify_authorized, except: :show

  def index
    @received_opps = @user.opportunities_received.length
    @connected_opps = @user.opportunities_connected.length
    render :index
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_site_template
    #   @site_template = Network.find(params[:network_id]).site_template
    # end
    # def passed_opp_params
    #   # passed_opp = params.require(:network).per
    #   { user_id: @user.id, opportunity_id: params[:opportunity_id] }
    # end
end
