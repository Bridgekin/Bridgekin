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
    amount = (duration == "yearly" ? product.yearly_amount : product.monthly_amount) * 100
    duration_purchased = duration == "yearly" ? 1.year : 1.month

    ActiveRecord::Base.transaction do
      logger.debug "Begin charge for user: #{payer.id}"
      self.end_date += duration_purchased
      self.save
      #External
      charge = Stripe::Charge.create({
        amount: amount,
        currency: 'usd',
        receipt_email: payer.email
      })
      # Track Payment - Internal
      self.stripe_payments.create(
        transaction_id: charge.id,
        customer: payer,
        amount: charge.amount
      )
    rescue ActiveRecord::StatementInvalid => e
      #revert call if charge
    end
  end
end
