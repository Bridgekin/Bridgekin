class CreateUserCircles < ActiveRecord::Migration[5.2]
  def change
    create_table :user_circles do |t|
      t.integer :circle_id
      t.integer :member_id
      t.timestamps
    end

    add_index :user_circles, :circle_id
  end
end
