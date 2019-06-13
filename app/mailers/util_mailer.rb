class UtilMailer < ApplicationMailer
  def notify_request_demo(request)
    @request = request
    mail(to: 'joe@bridgekin.com', subject: "#{request.demo_type} Demo Request!")
  end
end
