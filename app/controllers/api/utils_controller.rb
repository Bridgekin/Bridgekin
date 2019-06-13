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

  private

  def request_demo_params
    params.permit(:fname, :lname, :email, :demo_type)
  end
end
