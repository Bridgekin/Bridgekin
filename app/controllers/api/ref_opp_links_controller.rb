require_relative '../concerns/devise_controller_patch.rb'
class Api::RefOppLinksController < ApiController
  include DeviseControllerPatch
  before_action :set_user, only: [:create]

  def create
    #Create Link
    @ref_opp_link = RefOppLink.new(ref_opp_link_params)
    if @ref_opp_link.save
      render :create
    else
      render json: @ref_opp_link.errors.full_messages, status: 401
    end
  end

  def reveal
    #Get Opp
    @ref_opp_link = RefOppLink.includes(:owner, :ref_opportunity)
      .find_by(link_code: params[:link_code])

    if @ref_opp_link
      @ref_opp = @ref_opp_link.ref_opportunity
      render :reveal
    else
      render json: @ref_opp_link.errors.full_messages, status: 401
    end
  end

  private

  def ref_opp_link_params
    params.require(:ref_opp_link).permit(:owner_id, :ref_opp_id)
  end

  def set_user
    @user = 'something'
  end
end
