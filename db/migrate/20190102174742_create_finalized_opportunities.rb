class CreateFinalizedOpportunities < ActiveRecord::Migration[5.2]
  def change
    create_table :finalized_opportunities do |t|
      t.integer :opportunity_id, null: false
      t.integer :user_id, null: false
      t.integer :facilitator_id
      t.integer :network_id,
      t.timestamps
    end

    add_index :finalized_opportunities, [:opportunity_id, :user_id], unique: true
  end
end
