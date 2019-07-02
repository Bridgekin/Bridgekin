class CreateSalesAdminNetwork < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_admin_networks do |t|
      t.integer :admin_id
      t.integer :network_id
      
      t.timestamps
    end
  end
end
