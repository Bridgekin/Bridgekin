class CreateStripePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :stripe_payments do |t|
      t.integer :transaction_id
      t.integer :user_id
      t.integer :network_id
      t.integer :subscription
      t.integer :sub_id
      t.integer :seats
      t.integer :amount
      t.string :duration
      t.datetime :end_date

      t.timestamps
    end

    add_index :stripe_payments, :user_id
    add_index :stripe_payments, :sub_id
    add_index :stripe_payments, :network_id
  end
end
