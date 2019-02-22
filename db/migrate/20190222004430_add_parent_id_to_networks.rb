class AddParentIdToNetworks < ActiveRecord::Migration[5.2]
  def change
    add_column :networks, :parent_id, :integer
    add_column :networks, :workspace_id, :integer
  end
end
