class CreateSalesUserPermissions < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_user_permissions do |t|
      t.bigint :permissable_id
      t.string :permissable_type
      t.integer :user_id
      t.string :member_type, default: 'full'
      t.timestamps
    end

    add_index :sales_user_permissions, ["user_id", "permissable_type", "permissable_id"], :name => 'index_sales_user_permissions_on_permissable_type_and_id'
  end
end
