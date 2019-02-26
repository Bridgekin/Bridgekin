require_relative '../concerns/devise_controller_patch.rb'
class Api::SiteTemplatesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_site_template, only: [:show]
  # after_action :verify_authorized, except: :show

  def show
    render :show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_template
      @site_template = Network.find(params[:network_id]).site_template
    end
end
