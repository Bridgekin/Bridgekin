class Api::StripeController < ApiController
  before_action :authenticate_user
  def charge
    begin
      # debugger
      Stripe.api_key = Rails.application.credentials.stripe[:test][:secret_key]

      charge = Stripe::Charge.create({
        amount: 999,
        currency: 'usd',
        description: "Subscription: #{params[:subscripotion]}",
        source: 'tok_visa',
        receipt_email: "#{@current_user.email}",
        source: params[:token_id]
      })
      debugger
      parsed = JSON.parse(charge.body)
      debugger
      render json: parsed, status: 200
    rescue => exception
      render json: ["Failed"], status: 500
    end
  end

end
