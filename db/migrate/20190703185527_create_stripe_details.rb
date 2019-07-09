class CreateStripeDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :stripe_details do |t|
      t.integer :user_id
      t.string :customer_id
      t.string :status, default: "active"

      t.timestamps
    end

    add_index :stripe_details, :user_id
  end
end
