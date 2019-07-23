# require_relative '../concerns/devise_controller_patch.rb'
# class Api::DirectLinksController < ApiController
#   include DeviseControllerPatch
#   before_action :authenticate_user, except: [:show]
#   # after_action :verify_authorized, except: :index

#   def create
#     @link = DirectLink.find_by(
#       profile_id: @user.id,
#       opportunity_ids: params[:opportunity_ids])

#       # debugger
#     unless @link
#       @link = DirectLink.new(
#         profile_id: @user.id,
#         opportunity_ids: params[:opportunity_ids]
#       )
#       # debugger
#       if @link.save
#         render :create

#       else
#         render json: @link.errors.full_messages, status: 422
#       end
#     else
#       render :create
#     end
#   end

#   def show
#     @link = DirectLink.includes(:profile)
#       .find_by(link_code: params[:link_code])

#     if @link
#       @opportunities = @link.opportunities
#       @user = @link.profile
#       render :show
#     else
#       ender json: ['Invalid direct link'], status: :unprocessable_entity
#     end
#   end

#   private

#   # def referral_params
#   #   params.permit(:member_id, :network_id, :referral_code)
#   # end
# end
