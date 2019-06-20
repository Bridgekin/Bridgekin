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

  def connect_social
    inputs = params[:connect_social] 
    #social_params
    # import_hash = {}
    # inputs.each do |key, upload|
    #   case key
    #   when "linked_in_upload"
    #     import_hash[key] = CSV.parse(upload.read, headers: true)
    #   when "google_users_array"
    #     import_hash[key] = JSON.parse(upload)
    #   else
    #   end
    # end
    #Later, need to change this to an activeJob
    import_contacts(inputs, @current_user)
    # ConnectSocialJob.perform_later(import_hash, @current_user)

    render json: ["Parsing Results"], status: 201
  end

  private

  def social_params
    params.permit(:connect_social)
  end
  # def ref_opp_event_params
  #   params.require(:ref_opp_event).permit(:owner_id, :logged_out_email,
  #   :event, :ref_opp_id, :ref_opp_link_id)
  # end
end
