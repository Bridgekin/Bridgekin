class ChangeSalesNetworkInviteTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :sales_network_invites, :sales_invites
  end
end
