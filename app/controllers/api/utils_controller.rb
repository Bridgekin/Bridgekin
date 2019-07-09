class Api::UtilsController < ApiController
  def show
    @public_env = {
      rails_env: ENV.fetch("RAILS_ENV")
    }
    render :show
  end

  def request_demo
    request = DemoRequest.new(request_demo_params)
    if request.save
      UtilMailer.notify_request_demo(request).deliver_now
      render json: ["Sent"], status: 201
    else
      render json: ["Not Sent"], status: 400
    end
  end

  def validate_unique
    model = params[:model]
    field = params[:field]
    value = params[:input]
    
    valid = case model
    when "SalesNetwork"
      SalesNetwork.find_by("LOWER(#{field})=LOWER(?)", value).nil?
    when "User"
      User.find_by(field => value).nil?
    else
      false
    end

    render json: valid, status: 200
  end

  private

  def request_demo_params
    params.permit(:fname, :lname, :email, :demo_type)
  end
end
