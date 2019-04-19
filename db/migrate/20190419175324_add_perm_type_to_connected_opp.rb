class AddPermTypeToConnectedOpp < ActiveRecord::Migration[5.2]
  def change
    remove_column :connected_opportunities, :network_id

    add_column :connected_opportunities, :perm_type, :string
  end
end
