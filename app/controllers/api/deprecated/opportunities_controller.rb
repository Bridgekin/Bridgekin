# require_relative '../concerns/devise_controller_patch.rb'
# require_relative '../concerns/sql_controller_module.rb'
# class Api::OpportunitiesController < ApiController
#   include DeviseControllerPatch
#   include SQLControllerModule
#   before_action :set_opportunity, only: [:show, :update, :destroy]
#   before_action :authenticate_user
#   before_action :set_workspace_networks, only: [:index]

#   after_action :verify_authorized, except: [:index, :user_index,
#     :profile_index, :all_touched_index, :delete_all_user_opps]
#   # after_action :verify_policy_scoped, only: :index

#   def index
#     # debugger
#     option = params[:option].split('-')
#     @opportunities = []
#     if option.empty?
#       # @opportunities = opps_all_networks + opps_direct_connections +
#       # opps_all_connections
#       # direct_opp_perms,
#       # indirect_opp_perms,
#       # network_opp_perms,
#       @opp_permissions,
#       @opportunities = fetch_all_opp_permissions
#       # @opp_permissions = direct_opp_perms +
#       #   indirect_opp_perms + network_opp_perms
#     else
#       if option.first == 'all'
#         case option.last
#         when 'networks'
#           @opp_permissions = opps_all_networks
#         when 'connections'
#           @opp_permissions = opps_all_connections
#         when 'circles'
#           @opp_permissions = opps_all_circles
#         else
#         end
#       elsif option.first == 'direct'
#         # Only for Direct Connections
#         @opp_permissions = opps_direct_connections
#       else
#         if option.last == 'network'
#           if @user.member_networks.pluck(:id).include?(option.first.to_i)
#             # For Networks by ID
#             @opp_permissions = opps_network_id(option.first)
#           end
#         elsif option.last == 'circle'
#           @opp_permissions = opps_circle_id(option.first)
#         end
#       end
#       # @opportunities = @opportunities.sort{|a,b| b.created_at <=> a.created_at}
#       # @filteredOpps = @opportunities.pluck(:id)
#       @opportunities = @opp_permissions.map{|perm| perm.opportunity}
#     end
#     # debugger
#     render :index
#     # if @opportunities.length === 0
#     #   render :index
#     # else
#     #   render json: ["You don't have access to this resource"], status: 422
#     # end
#   end

#   def user_index
#     @opportunities = @user.opportunities
#       .includes(:owner, :opp_permissions)
#       .where.not(deal_status: 'Deleted')

#     @opp_permissions = OppPermission.where(opportunity_id: @opportunities.pluck(:id))
#     render :index
#   end

#   def profile_index
#     #params[profileId]
#     @opportunities = Opportunity.profile_index(params[:profile_id], @user)

#     @filteredOpps = @opportunities.pluck(:id)
#     render :personal_index
#   end

#   def all_touched_index
#     user_opportunities = @user.opportunities
#       .includes(:owner)
#       .where.not(deal_status: 'Deleted')

#     @user_opp_permissions = OppPermission.where(
#       opportunity_id: user_opportunities.pluck(:id))

#     connected_opportunities = @user.opportunity_connections
#       .where(status: 'Approved')
#     @connected_opportunity_ids = connected_opportunities.pluck(:id)

#     facilitated_opportunities = @user.opportunity_connections_facilitated
#       .where(status: 'Approved')
#     @facilitated_opportunity_ids = facilitated_opportunities.pluck(:id)

#     @passed_opportunity_ids = PassedOpportunity.where(user_id: @user.id)
#       .pluck(:opportunity_id)
#     opportunities_passed = Opportunity.where(id: @passed_opportunity_ids)

#     @saved_opportunities = SavedOpportunity.where(user_id: @user.id)
#     opportunities_saved = Opportunity.where(id: @saved_opportunities.pluck(:opportunity_id))
#     # debugger
#     @opportunities = connected_opportunities | facilitated_opportunities |
#       user_opportunities | opportunities_passed | opportunities_saved

#     render :all_touched_index
#   end

#   def show
#     authorize @opportunity
#     @networks = @opportunity.networks.pluck(:id)
#     render :show
#   end

#   def create
#     @opportunity = Opportunity.new(opportunity_params
#       .merge({owner_id: @user.id, status: "Approved", deal_status:'Active'}))
#     authorize @opportunity

#     if @opportunity.save
#       #Set Permissions AND Send Notifications
#       @opportunity.set_permissions(params[:opportunity][:permissions])

#       # Send email to joe
#       OpportunityMailer.flag_opportunity_creation(@opportunity, @user).deliver_later
#       # render json: @opportunity, status: :created, location: @opportunity
#       render :show
#     else
#       render json: @opportunity.errors.full_messages, status: :unprocessable_entity
#     end
#   end

#   # PATCH/PUT /opportunities/1
#   def update
#     authorize @opportunity

#     if @opportunity.update(opportunity_params)
#       @opportunity.picture.purge if params[:opportunity][:picture] == "delete"
#       @opportunity.set_permissions(params[:opportunity][:permissions]) if params[:opportunity][:permissions]

#       @networks = @opportunity.networks.pluck(:id)
#       # render json: @opportunity
#       render :show
#     else
#       render json: @opportunity.errors.full_messages, status: :unprocessable_entity
#     end
#   end

#   # DELETE /opportunities/1
#   def destroy
#     @opportunity[:deal_status] = "Deleted"
#     authorize @opportunity
#     if @opportunity.save
#       @opportunity.opp_permissions.destroy_all
#       render json: ['Opportunity was destroyed'], status: :ok
#     else
#       render json: @opportunity.errors.full_messages, status: :unprocessable_entity
#     end
#   end

#   def delete_all_user_opps
#     @user.opportunities.destroy_all if Rails.env.development?
#     render json: ['Finish']
#   end

#   private
#     # Use callbacks to share common setup or constraints between actions.
#     def set_opportunity
#       @opportunity = Opportunity.find(params[:id])
#     end

#     def set_workspace_networks
#       @workspace_networks = Network.where(workspace_id: params[:workspace_id])
#         .where(id: @user.member_networks)
#         .or(Network.where(id: params[:workspace_id])
#           .where(id: @user.member_networks))
#         .includes(:opportunities)

#       @workspace_network_members = User.joins(:user_networks)
#         .where(user_networks: { network_id: @workspace_networks.pluck(:id)})
#       # @workspace_connections = @user.friends.joins(:user_networks)
#       #   .where(user_networks: { network_id: @workspace_networks.pluck(:id) })
#     end

#     # Only allow a trusted parameter "white list" through.
#     def opportunity_params
#       # debugger
#       if params[:opportunity][:picture] == "delete"
#         opp_params = params.require(:opportunity).permit(:title, :description,
#           :owner_id, :opportunity_need, :value, :anonymous, :view_type,
#           :deal_status, :industries, :geography)
#       else
#         opp_params = params.require(:opportunity).permit(:title, :description,
#           :owner_id, :opportunity_need, :value, :picture, :anonymous, :view_type,
#           :deal_status, :industries, :geography)
#       end

#       [:geography, :industries].each do |field|
#         opp_params[field] = opp_params[field].split(',') unless opp_params[field].nil?
#       end
#       opp_params[:anonymous] = params[:opportunity][:anonymous] == 'true' unless params[:opportunity][:anonymous].nil?

#       opp_params
#     end
# end
