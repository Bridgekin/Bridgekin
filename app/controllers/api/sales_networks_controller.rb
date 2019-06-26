# require_relative '../concerns/devise_controller_patch.rb'
require_relative '../../models/concerns/connect_social.rb'
require 'csv'
class Api::SalesNetworksController < ApiController
  # include DeviseControllerPatch
  include ConnectSocial
  # before_action :set_ref_opp, only: [:show]
  before_action :authenticate_user, only: [:connect_social]

  def index
    @sales_networks = SalesNetwork.where("LOWER(title) LIKE ?" , "%" + params[:title].downcase + "%")

    render :index
  end
  # def ref_opp_event_params
  #   params.require(:ref_opp_event).permit(:owner_id, :logged_out_email,
  #   :event, :ref_opp_id, :ref_opp_link_id)
  # end
end
