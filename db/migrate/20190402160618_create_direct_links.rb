class CreateDirectLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :direct_links do |t|
      t.string :link_code, null: false, unique: true
      t.string :opportunity_ids, array: true
      t.integer :profile_id

      t.timestamps
    end

    add_index :direct_links, :link_code
  end
end
