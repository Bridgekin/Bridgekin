require_relative '../concerns/devise_controller_patch.rb'
class Api::ConnectedOpportunitiesController < ApiController
  include DeviseControllerPatch
  before_action :set_connected_opportunity, only: [:show, :update, :destroy]
  before_action :authenticate_user

  after_action :verify_authorized, except: :index
  # after_action :verify_policy_scoped, only: :index

  def index
    connected_opportunities = @user.opportunity_connections
      .where(status: 'Approved')
      .order(created_at: :desc)
      # .where.not(deal_status: 'Deleted')
    facilitated_opportunities = @user.opportunity_connections_facilitated
      .where(status: 'Approved')
      .order(created_at: :desc)
      # .where.not(deal_status: 'Deleted')

    @connected_opps = connected_opportunities.pluck(:id)
    @facilitated_opps = facilitated_opportunities.pluck(:id)
    @opportunities = connected_opportunities | facilitated_opportunities

    render :index
  end

  # GET /opportunities/1
  def show
    authorize @connected_opportunity
    render :show
  end

  # POST /opportunities
  def create
    opportunity = Opportunity.find(params[:connected_opportunity][:opportunity_id])
    newConnectedOpportunity = {
      opportunity_id: params[:connected_opportunity][:opportunity_id],
      network_id: params[:connected_opportunity][:network_id]
    }

    if params[:connected_opportunity][:connect_bool]
      newConnectedOpportunity[:user_id] = @user.id
      @connected_opportunity = ConnectedOpportunity.new(newConnectedOpportunity)
      authorize @connected_opportunity

      if opportunity.owner == @user
        render json: ["You can't connect to your own opportunity"], status: 422
      elsif @connected_opportunity.save
        #Send Email
        if params[:connected_opportunity][:subject]
          subject = params[:connected_opportunity][:subject]
          body = params[:connected_opportunity][:body]
          ConnectedOpportunityMailer.make_connection_template(
            @connected_opportunity, subject, body).deliver_now
        else
          ConnectedOpportunityMailer.make_connection(@connected_opportunity).deliver_now
        end
        render :show
      else
        # render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
        render json: ["You've already connected to this opportunity"], status: :unprocessable_entity
      end
    else
      newConnectedOpportunity[:facilitator_id] = @user.id
      @connected_opportunity = ConnectedOpportunity.new(newConnectedOpportunity)
      authorize @connected_opportunity

      if opportunity.owner == @user
        render json: ["You can't connect to your own opportunity"], status: 422
      elsif @connected_opportunity.save
        #Send Email
        if params[:connected_opportunity][:subject]
          subject = params[:connected_opportunity][:subject]
          body = params[:connected_opportunity][:body]
          ConnectedOpportunityMailer.make_facilitated_connection_template(
            @connected_opportunity, subject, body).deliver_now
        else
          ConnectedOpportunityMailer.make_facilitated_connection(@connected_opportunity).deliver_now
        end
        render :show
      else
        render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
      end
    end

  end

  # def referredConnection
  #   if params[:facilitator_id]
  #     @connected_opportunity = ConnectedOpportunity.new(connected_opportunity_params)
  #   # else params[:]
  #
  #   if @connected_opportunity.save
  #     # Send email
  #     render :show
  #   else
  #     render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /opportunities/1
  def update
    authorize @connected_opportunity
    if @connected_opportunity.update(connected_opportunity_params)
      # render json: @connected_opportunity
      render :show
    else
      render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /opportunities/1
  def destroy
    authorize @connected_opportunity
    if @connected_opportunity.destroy
      render json: ['Connected opportunity was destroyed'], status: :ok
    else
      render json: @connected_opportunity.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_connected_opportunity
      @connected_opportunity = ConnectedOpportunity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def connected_opportunity_params
      params.require(:connected_opportunity).permit(:opportunity_id,
        :connect_bool, :network_id)
      # params.permit(:opportunity_id, :connect_bool, :network_id)
    end
end
