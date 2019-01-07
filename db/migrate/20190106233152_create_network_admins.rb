class CreateNetworkAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :network_admins do |t|
      t.integer :network_id, null: false
      t.integer :admin_id, null: false
      t.timestamps
    end

    add_index :network_admins, [:network_id, :admin_id], unique: true
  end
end
