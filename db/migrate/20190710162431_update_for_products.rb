class UpdateForProducts < ActiveRecord::Migration[5.2]
  def change
    remove_column :admin_signup_links, :network_id
    remove_column :admin_signup_links, :amount
    remove_column :admin_signup_links, :seats

    add_column :admin_signup_links, :product_id, :integer

    rename_column :subscriptions, :cadence, :duration
    rename_column :subscriptions, :renew, :renewal

    remove_column :subscriptions, :amount
    remove_column :subscriptions, :seats

    add_column :subscriptions, :product_id, :integer

    remove_column :stripe_payments, :amount
    remove_column :stripe_payments, :seats
    remove_column :stripe_payments, :subscription

    add_column :stripe_payments, :product_id, :integer

  end
end
