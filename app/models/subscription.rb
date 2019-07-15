class Subscription < ApplicationRecord
  validates :payer_id, :targetable_id, :targetable_type, :end_date, :product_id, presence: true

  scope :active, -> { where(status: "active") }

  belongs_to :payer,
    foreign_key: :payer_id,
    class_name: :User

  belongs_to :product,
    foreign_key: :product_id,
    class_name: :SalesProduct

  belongs_to :targetable, 
    polymorphic: true

  has_many :stripe_payments,
    foreign_key: :sub_id,
    class_name: :StripePayment

  def renew_subscription
    payer = self.payer
    product = self.product
    target = self.targetable
    customer_id = payer.stripe_details.customer_id
    amount = (self.duration == "yearly" ? product.yearly_amount : product.monthly_amount) * 100
    duration_purchased = self.duration == "yearly" ? 1.year : 1.month

    ActiveRecord::Base.transaction do
      logger.debug "Begin charge for user: #{payer.id}"
      self.end_date += duration_purchased
      self.failed_renewal = nil
      self.save!
      #External
      charge = Stripe::Charge.create({
        amount: amount,
        currency: 'usd',
        receipt_email: payer.email,
        customer: customer_id 
      })
      # Track Payment - Internal
      self.stripe_payments.create(
        transaction_id: charge.id,
        customer: payer,
        duration: self.duration,
        end_date: self.end_date,
        product_id: self.product_id
      )
      StripeMailer.send_sub_confirmation_email(charge, subscription, payer, product)
      logger.debug "Finished"
      return true
    rescue Stripe::CardError => e
      # Since it's a decline, Stripe::CardError will be caught
      debugger
      body = e.json_body
      err  = body[:error]
      logger.error "Status is: #{e.http_status}"
      logger.error "Type is: #{err[:type]}"
      logger.error "Charge ID is: #{err[:charge]}"
      self.update(failed_renewal: DateTime.now)
      StripeMailer.sub_card_declined_email(charge, payer, product)
      return false
    rescue Stripe::RateLimitError => e
      # Too many requests made to the API too quickly
      debugger
      logger.error "Rate Limit Reached"
      self.update(failed_renewal: DateTime.now)
      return false
    rescue Stripe::InvalidRequestError => e
      # Invalid parameters were supplied to Stripe's API
      debugger
      logger.error "Invalid params"
      return false
    rescue Stripe::AuthenticationError => e
      # Authentication with Stripe's API failed
      # (maybe you changed API keys recently)
      debugger
      logger.error "Authentication error (probably because of API key)"
      return false
    rescue Stripe::APIConnectionError => e
      # Network communication with Stripe failed
      debugger
      logger.error "Network comms error with Stripe"
      return false
    rescue Stripe::StripeError => e
      # Display a very generic error to the user, and maybe send yourself an email
      debugger
      logger.error "Authentication error (probably because of API key)"
      return false
    rescue => e
      # Something else happened, completely unrelated to Stripe
      debugger
      #check if we need to revert charge
      logger.error "Something else happened: #{e.message}"
      self.update(failed_renewal: DateTime.now)
      StripeMailer.sub_renewal_failed_email(payer, product)
      return false
    end
  end
end
