class AddCurrentSubAndCustomerId < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_networks, :current_sub_id, :integer
  end
end
