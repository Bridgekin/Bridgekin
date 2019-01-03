class CreateSavedOpportunities < ActiveRecord::Migration[5.2]
  def change
    create_table :saved_opportunities do |t|
      t.integer :opportunity_id, null: false
      t.integer :user_id, null: false
      t.integer :network_id,
      t.timestamps
    end
    add_index :saved_opportunities , [:opportunity_id, :user_id], unique: true

    remove_index :finalized_opportunities, name: "index_finalized_opportunities_on_opportunity_id_and_user_id"

    add_index :finalized_opportunities, :opportunity_id, unique: true
  end
end
