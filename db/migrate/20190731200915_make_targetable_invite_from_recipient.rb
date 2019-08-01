class MakeTargetableInviteFromRecipient < ActiveRecord::Migration[5.2]
  def change
    remove_column :sales_network_invites, :recipient_user_network_id

    add_column :sales_network_invites, :permissable_type, :string
    add_column :sales_network_invites, :permissable_id, :bigint

    add_index :sales_network_invites,
      ["permissable_id", "permissable_type"], 
      :name => 'index_sales_network_invites_on_permissable_type_and_id'
  end
end
