class CreateRefOppLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :ref_opp_links do |t|
      t.integer :owner_id
      t.string :link_code, null: false
      t.integer :ref_opp_id, null: false
      t.timestamps
    end
  end
end
