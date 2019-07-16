class AddUserTypeToNetworkInvite < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_network_invites, :user_type, :string, default: 'full'
    add_column :sales_network_invites, :link_code, :string
  end
end
