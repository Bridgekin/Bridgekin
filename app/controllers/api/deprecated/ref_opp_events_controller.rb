# require_relative '../concerns/devise_controller_patch.rb'
# class Api::RefOppEventsController < ApiController
#   include DeviseControllerPatch
#   before_action :set_ref_opp, only: [:show]

#   def create
#     @event = RefOppEvent.new(ref_opp_event_params)
#     if @event.save
#       if event == "Apply"
#         ref_opp = RefOpp.includes(:owner)
#           .find(params[:ref_opp_event][:ref_opp_id])
#         owner = ref_opp.owner
#         applicant = User.find(params[:ref_opp_event][:actor_id])
#         RefOppMailer.ref_opp_apply(owner, applicant, ref_opp).deliver_later
#       end
#       render :json ["Event created"], status: 200
#     else
#       render json: @ref_opp_link.errors.full_messages, status: 401
#     end
#   end

#   private

#   def ref_opp_event_params
#     params.require(:ref_opp_event).permit(:owner_id, :logged_out_email,
#     :event, :ref_opp_id, :ref_opp_link_id)
#   end
# end
