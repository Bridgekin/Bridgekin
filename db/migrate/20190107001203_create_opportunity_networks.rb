class CreateOpportunityNetworks < ActiveRecord::Migration[5.2]
  def change
    create_table :opportunity_networks do |t|
      t.integer :network_id, null: false
      t.integer :opportunity_id, null: false
      t.timestamps
    end

    add_index :opportunity_networks,
      [:network_id, :opportunity_id], unique: true
  end
end
