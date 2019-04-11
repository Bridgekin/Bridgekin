class CreateOpportunitiesPassed < ActiveRecord::Migration[5.2]
  def change
    create_table :passed_opportunities do |t|
      t.integer :user_id
      t.integer :opportunity_id
      t.timestamps
    end

    add_index :passed_opportunities, :user_id
  end
end
