class CreateRefOpportunities < ActiveRecord::Migration[5.2]
  def change
    create_table :ref_opportunities do |t|
      t.integer :owner_id
      t.string :url
      t.string :title
      t.text :description
      t.string :company
      t.string :location
      t.string :salary
      t.string :incentive_interview
      t.string :incentive_hire

      t.timestamps
    end

    add_index :ref_opportunities, :owner_id
  end
end
