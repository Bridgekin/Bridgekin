require_relative '../concerns/devise_controller_patch.rb'
class Api::OppPermissionsController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_opportunity, only: [:index]
  # before_action :set_user_with_search, only: [:shareOptions]
  # after_action :verify_authorized, except: :show

  def index
    opp_perms = @opportunity.opp_permissions
    @constructed_perms = opp_perms.reduce([]) do |arr, perm|
      arr << "#{perm.shareable_id}-#{perm.shareable_type}"
    end

    render :index
  end

  def shareOptions
    @networks = @user.member_networks
    constructed_networks = @networks.reduce([]) do |arr, resource|
      arr << "#{resource.id}-Network"
    end

    @share_options = constructed_networks
    render :shareOptions
  end

  def create
    type = params[:permission][:type]
    @opp_permission.new(
      opportunity_id: params[:permission][:opportunity_id],
      shareable_type: params[:permission][:type],
      shareable_id: params[:permission][:type_id],
    )

    if @opp_permission.save
      render :show
    else
      render json: @opp_permission.errors.full_messages, status: 422
    end
  end

  def destroy
    @opp_permission = OppPermission.find(params[:id])
    if @opp_permission.delete
      render json:['Successfully removed permission'], status: 200
    else
      render json: @opp_permission.errors.full_messages, status: 422
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_opportunity
      @opportunity = Opportunity.find(params[:opportunity_id])
    end

    # def set_user_with_search
    #   @user = User.where(@user.id).includes(:member_networks).first
    # end

    # def permission_params
    #   params.require(:permission).permit(:type, :opportunity_id, )
    # end

end
