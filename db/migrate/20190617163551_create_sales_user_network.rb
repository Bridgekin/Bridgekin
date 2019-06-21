class CreateSalesUserNetwork < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_user_networks do |t|
      t.integer :network_id
      t.integer :user_id

      t.timestamps
    end

    add_index :sales_user_networks, [:network_id, :user_id]
  end
end
