class UpdateStripePayments < ActiveRecord::Migration[5.2]
  def change
    remove_column :stripe_payments, :network_id
  end
end
