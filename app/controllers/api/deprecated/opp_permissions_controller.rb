require_relative '../concerns/devise_controller_patch.rb'
class Api::OppPermissionsController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_opportunity, only: [:index]
  # before_action :set_user_with_search, only: [:shareOptions]
  # after_action :verify_authorized, except: :show

  def index
    opp_perms = @opportunity.opp_permissions
    @networks = Network.where(
      id: opp_perms.where(shareable_type: 'Network')
      .pluck(:shareable_id))
    @connections = Connection.where(
      id: opp_perms.where(shareable_type: 'Connection')
      .pluck(:shareable_id))

    #make sure that we aren't passing perms for nonexistent targets
    confirmed_perms = opp_perms.where(
      shareable_id: @networks.pluck(:id),
      shareable_type: 'Network')
      .or(opp_perms.where(
        shareable_id: @connections.pluck(:id),
        shareable_type: 'Connection'))
    @constructed_perms = createOppPermissions(confirmed_perms)

    render :index
  end

  def shareOptions
    @networks = @user.member_networks
    @circles = @user.circles_with_at_least_one_member
    @connections = @user.connections.includes(:requestor, :recipient)
      .where(status: 'Accepted')

    @share_options = createShareOptions(@networks, 'Network') +
      createShareOptions(@connections, 'Connection') +
      createShareOptions(@circles, 'Circle')

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
