class CreateCircles < ActiveRecord::Migration[5.2]
  def change
    create_table :circles do |t|
      t.string :title
      t.integer :owner_id
      t.timestamps
    end

    add_index :circles, :owner_id
  end
end
