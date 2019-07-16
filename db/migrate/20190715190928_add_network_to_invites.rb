class AddNetworkToInvites < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_network_invites, :network_id, :integer
  end
end
