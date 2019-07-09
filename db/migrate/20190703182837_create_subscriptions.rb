class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :network_id
      t.integer :user_id
      t.integer :amount
      t.string :cadence
      t.boolean :renew
      t.integer :seats
      t.datetime :end_date
      t.string :status, default: 'active'
      t.timestamps
    end

    add_index :subscriptions, :network_id
    add_index :subscriptions, :user_id
  end
end
