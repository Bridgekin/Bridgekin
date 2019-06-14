require_relative '../concerns/devise_controller_patch.rb'
class Api::UserFeaturesController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_user_feature, only: [:update]
  # after_action :verify_authorized, except: :show

  def update
    if @user_feature.update(user_feature_params)
      render :show
    else
      render json: @user_feature.errors.full_messages, status: 422
    end
  end


  private
    def set_user_feature
      @user_feature = UserFeature.find(params[:id])
    end

    def user_feature_params
      params.require(:payload).permit(:user_id, :tutorial_tour_date, :user_onboarding, :tutorial_tour_step, :tutorial_tour_session,
      :initial_posting_date, :imported_social)
    end
    # Use callbacks to share common setup or constraints between actions.
    # def set_site_template
    #   @site_template = Network.find(params[:network_id]).site_template
    # end
end
