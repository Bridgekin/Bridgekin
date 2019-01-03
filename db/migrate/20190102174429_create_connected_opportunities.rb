class CreateConnectedOpportunities < ActiveRecord::Migration[5.2]
  def change
    create_table :connected_opportunities do |t|
      t.integer :opportunity_id, null: false
      t.integer :user_id, null: false
      t.integer :facilitator_id
      t.integer :network_id,
      t.timestamps
    end

    add_index :connected_opportunities, :opportunity_id
    add_index :connected_opportunities, :user_id
  end
end
