class CreateUserNetworks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_networks do |t|
      t.integer :network_id, null: false
      t.integer :member_id, null: false
      t.timestamps
    end

    add_index :user_networks, [:network_id, :member_id], unique: true
  end
end
