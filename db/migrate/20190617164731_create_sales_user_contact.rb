class CreateSalesUserContact < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_user_contacts do |t|
      t.integer :contact_id
      t.integer :user_id

      t.timestamps
    end

    add_index :sales_user_contacts, [:user_id, :contact_id]
  end
end
