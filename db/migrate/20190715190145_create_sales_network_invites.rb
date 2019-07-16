class CreateSalesNetworkInvites < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_network_invites do |t|
      t.string :email
      t.string :fname
      t.string :lname
      t.integer :sender_id

      t.timestamps
    end

    add_index :sales_network_invites, :sender_id
  end
end
