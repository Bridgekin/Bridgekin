# require_relative '../concerns/devise_controller_patch.rb'
require 'csv'
class Api::SalesNetworksController < ApiController
  # include DeviseControllerPatch
  # before_action :set_ref_opp, only: [:show]

  def index
    title = params[:title]
    @sales_networks = SalesNetwork.where(title: /.*#{title}.*/i)
    # debugger
    render :index
  end

  def connect_social
    inputs = params[:connect_social]
    # debugger
    currentUserNode = SalesMember.find_by(user_id: @currentUser.id)

    if inputs[:linked_in_upload]
      parsedFile = CSV.parse(inputs[k].read, headers: true)
      SalesContact.ingestLinkedIn(parsedFile, currentUserNode)
    end

    if inputs[:google_users]
      SalesContact.ingestGoogle(inputs[:google_users], currentUserNode)
    end

    render json: ["Parsing Results"], status: 201
  end

  private

  # def ref_opp_event_params
  #   params.require(:ref_opp_event).permit(:owner_id, :logged_out_email,
  #   :event, :ref_opp_id, :ref_opp_link_id)
  # end
end
