class CreateOpportunityPermissions < ActiveRecord::Migration[5.2]
  def change
    create_table :opp_permissions do |t|
      t.references :shareable, polymorphic: true
      t.integer :opportunity_id, null: false
      t.timestamps
    end
  end
end
