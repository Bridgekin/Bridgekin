class Api::SalesIntrosController < ApiController
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
    @actors = [@sales_intro.requestor, @sales_intro.recipient]
    render :show
  end

  def create
    #Find recipient
    @contact = SalesContact.find(intro_params[:contact_id])
    recipient = User.find(params[:sales_intro][:target_id])
    #Request Intro 
    @sales_intro = SalesIntro.new(intro_params
      .merge({
        requestor_id: @current_user.id,
        recipient_id: recipient.id
      }))
    if @sales_intro.save
      @sales_contact = @sales_intro.contact
      SalesMailer.request_sales_intro(@sales_intro).deliver_later
      @actors = [@sales_intro.requestor, @sales_intro.recipient]
      render :show
    else
      render json: @sales_intro.errors.full_messages, status: 422
    end
  end

  def update
    if @sales_intro.update(intro_params)
      @sales_contact = @sales_intro.contact
      @actors = [@sales_intro.requestor, @sales_intro.recipient]
      render :show
    else
      render json: @sales_intro.errors.full_messages, status: 422
    end
  end

  def respond_intro_request
    response = params[:response]
    sales_intro = SalesIntro.find(response[:intro_id])
    prev_decision = sales_intro.request_status
    
    decision = response[:decision]
    if sales_intro.update(request_status: decision)
      case response[:decision]
      when "intro" #Intro
        subject = response[:subject]
        email = response[:email]
        body = response[:body]
        SalesMailer.notify_requestor_intro_sent(sales_intro, @current_user).deliver_later
      when "prefer not" #"I'd prefer not to reach out"
        reason = response[:reason]
        details = response[:details]
        SalesMailer.refuse_intro(reason, details, sales_intro).deliver_later
      when "don't know" #Don't Know
        SalesMailer.decline_intro(sales_intro).deliver_later
      else
      end if prev_decision == "open"
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
      :referral_bonus, :deal_status, :request_status,
      :intro_subject, :intro_body, :referral_unit)
  end

  def set_sales_intro
    @sales_intro = SalesIntro.includes(:contact, :requestor, :recipient)
      .find(params[:id])
  end
end
