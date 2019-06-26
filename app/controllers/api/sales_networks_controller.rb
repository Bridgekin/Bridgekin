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
    import_hash = {}
    inputs.each do |key, upload|
      case key
      when "linked_in_upload"
        parsedFile = CSV.parse(upload.read, headers: true)
        import_hash[key] = parsedFile
      when "google_users_array"
        parsed_array = JSON.parse(upload)
        import_hash[key] = parsed_array
      else
      end
    end
    ConnectSocialJob.perform_later(import_hash, @current_user)

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
