# require_relative '../concerns/devise_controller_patch.rb'
# class Api::RefOppLinksController < ApiController
#   include DeviseControllerPatch
#   before_action :authenticate_user 

#   def create
#     #Create Link
#     # @ref_opp_link = RefOppLink.find_by(
#     #   owner_id: @user.id,
#     #   ref_opp_id: params[:id]
#     # )
#     # unless @ref_opp_link
#     #   @ref_opp_link = @user.ref_opp_links.new(ref_opp_id: params[:id])
#     #   if @ref_opp_link.save
#     #     render :create
#     #   else
#     #     render json: @ref_opp_link.errors.full_messages, status: 401
#     #   end
#     # else
#     #   render :create
#     # end
#     # debugger
#     @ref_opp_link = @user.ref_opp_links.new(ref_opp_id: params[:id])
#     if @ref_opp_link.save
#       render :create
#     else
#       render json: @ref_opp_link.errors.full_messages, status: 404
#     end
#   end

#   # def reveal
#   #   #Get Opp
#   #   @ref_opp_link = RefOppLink.includes(:owner, :ref_opportunity)
#   #     .find_by(link_code: params[:link_code])

#   #   if @ref_opp_link
#   #     @ref_opp = @ref_opp_link.ref_opportunity
#   #     render :reveal
#   #   else
#   #     render json: @ref_opp_link.errors.full_messages, status: 401
#   #   end
#   # end

#   private

#   def ref_opp_link_params
#     params.require(:ref_opp_link).permit(:owner_id, :ref_opp_id)
#   end
# end
