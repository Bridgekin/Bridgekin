class CreateOpportunities < ActiveRecord::Migration[5.2]
  def change
    create_table :opportunities do |t|
      t.integer :owner_id, null: false
      t.string :title, null: false
      t.text :description
      t.string :opportunity_needs, null: false
      t.string :industries, null: false, array: true
      t.string :geography, null: false, array: true
      t.string :value, null: false
      t.string :status, null: false
      t.timestamps
    end

    add_index :opportunities, :owner_id
  end
end
