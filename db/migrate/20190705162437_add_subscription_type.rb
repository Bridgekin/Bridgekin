class AddSubscriptionType < ActiveRecord::Migration[5.2]
  def change
    remove_column :subscriptions, :network_id
    rename_column :subscriptions, :user_id, :payer_id

    add_reference :subscriptions, :targetable, polymorphic: true, index: true
    add_column :subscriptions, :sub_type, :string
  end
end
