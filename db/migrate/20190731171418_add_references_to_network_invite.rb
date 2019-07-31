class AddReferencesToNetworkInvite < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_network_invites, :recipient_id, :integer
    add_column :sales_network_invites, :recipient_user_network_id, :integer
  end
end
