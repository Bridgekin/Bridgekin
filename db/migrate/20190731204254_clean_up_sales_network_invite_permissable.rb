class CleanUpSalesNetworkInvitePermissable < ActiveRecord::Migration[5.2]
  def change
    remove_column :sales_network_invites, :permissable_type, :string
    remove_column :sales_network_invites, :permissable_id, :bigint

    add_column :sales_network_invites, :inviteable_type, :string
    add_column :sales_network_invites, :inviteable_id, :bigint

    add_index :sales_network_invites,
      ["inviteable_id", "inviteable_type"], 
      :name => 'index_sales_network_invites_on_inviteable_type_and_id'

  end
end
