class SalesProduct < ApplicationRecord
  validates :seats, :monthly_amount, :yearly_amount, presence: :true

  has_many :admin_signup_links,
    foreign_key: :product_id,
    class_name: :AdminSignupLink

  has_many :subscriptions,
    foreign_key: :product_id,
    class_name: :Subscription

  has_many :stripe_payments,
    foreign_key: :product_id,
    class_name: :StripePayment
end