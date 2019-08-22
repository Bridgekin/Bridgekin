class Api::StripeController < ApiController
  before_action :authenticate_user
  def charge
    begin
      # debugger
      Stripe.api_key = Rails.env === "development" ?  Rails.application.credentials.stripe[Rails.env.to_sym] : ENV['STRIPE_SECRET_KEY_SK']

      charge = Stripe::Charge.create({
        amount: 999,
        currency: 'usd',
        description: "Subscription: #{params[:subscripotion]}",
        source: 'tok_visa',
        receipt_email: "#{@current_user.email}",
        source: params[:token_id]
      })

      parsed = JSON.parse(charge.body)
      render json: parsed, status: 200
    rescue => exception
      render json: ["Failed"], status: 500
    end
  end

end
