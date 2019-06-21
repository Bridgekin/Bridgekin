# require_relative '../concerns/devise_controller_patch.rb'
class Api::SalesIntrosController < ApiController
  # include DeviseControllerPatch
  before_action :authenticate_user
  before_action :set_sales_intro, only: [:show, :update,
  :destroy]

  def index
    #Get all users that current_user has reached out to as #Leads
    requests_sent = @current_user.intro_requests_sent
    requests_received = @current_user.intro_requests_received

    @intro_requests = requests_sent + requests_received
    @requests_sent = requests_sent.pluck(:id)
    @requests_received = requests_received.pluck(:id)

    @sales_contacts = SalesContact.where(id: @intro_requests.pluck(:contact_id))
    @actors = User.where(id: @intro_requests.pluck(:requestor_id))
    .or(User.where(id: @intro_requests.pluck(:recipient_id)))

    render :index
  end

  def show
    @sales_contact = @sales_intro.contact
    render :show
  end

  def create
    #Find recipient
    @contact = SalesContact.find(intro_params[:contact_id])
    network = @current_user.sales_networks.first
    recipient = contact.friends
      .where.not(id: @current_user.id)
      .where(id: network.members.pluck(:id))
      .first
    #Request Intro 
    @sales_intro = SalesIntro.new(intro_params
      .merge({
        requestor_id: @current_user.id,
        recipient_id: recipient.id
      }))
    if @sales_intro.save
      SalesMailer.request_sales_intro(@sales_intro).deliver_later
      render :show
    else
      render json: @sales_intro.errors.full_messages, status: 422
    end
  end

  def update
    if @sales_intro.update(intro_params)
      @sales_contact = @sales_intro.contact
      render :show
    else
      render json: @sales_intro.errors.full_messages, status: 422
    end
  end

  def respond_intro_request
    response = params[:response]
    sales_intro = SalesIntro.find(response[:intro_id])
    
    decision = response[:decision]
    if sales_intro.update(decision: decision)
      case response[:decision]
      when "yes" #Intro
        subject = response[:subject]
        email = response[:email]
        body = response[:body]
        SalesMailer.make_intro(subject, email, body, sales_intro, @current_user).deliver_later
      when "no" #"I'd prefer not to reach out"
        reason = response[:reason]
        details = response[:details]
        SalesMailer.refuse_intro(reason, details, sales_intro, @current_user).deliver_later
      when "unknown" #Don't Know
        # SalesMailer.refuse_request(response, sales_intro, current_user).deliver_later
      else
      end
      render json: ["Success"], status: 200
    else
      render json: sales_intro.errors.full_messages, status: 422
    end
  end

  def destroy
    #Not sure if this is needed
    if @sales_intro.destroy
      render json: ["Deleted"], status: 200
    else
      render json: @sales_intro.errors.full_messages, status: 422
    end
  end

  private

  def intro_params
    params.require(:sales_intro).permit(:contact_id, 
      :recipient_id, :message, :explaination,
      :referral_bonus, :status)
  end

  def set_sales_intro
    @sales_intro = SalesIntro.includes(:contact)
      .find(params[:id])
  end
end
