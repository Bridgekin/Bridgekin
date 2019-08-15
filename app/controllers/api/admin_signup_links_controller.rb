require_relative '../concerns/devise_controller_patch.rb'
class Api::AdminSignupLinksController < ApiController
  include DeviseControllerPatch
  # before_action :authenticate_user
  # before_action :set_site_template, only: [:show]
  # after_action :verify_authorized, except: :show

  def show
    @admin_signup_link = AdminSignupLink.includes(:product).find_by(code: params[:code])

    if @admin_signup_link.nil?
      product = SalesProduct.find_by(seats: 1, monthly_amount: 49)
      @admin_signup_link = AdminSignupLink.includes(:product).find_by(product: product)
    end

    @sales_product = @admin_signup_link.product
    render :show
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_site_template
    #   @site_template = Network.find(params[:network_id]).site_template
    # end
    # def passed_opp_params
    #   # passed_opp = params.require(:network).per
    #   { user_id: @user.id, opportunity_id: params[:opportunity_id] }
    # end
end
