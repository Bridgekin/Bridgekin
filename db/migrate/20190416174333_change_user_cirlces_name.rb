class ChangeUserCirlcesName < ActiveRecord::Migration[5.2]
  def change
    create_table :circle_connections do |t|
      t.integer :circle_id
      t.integer :connection_id
      t.timestamps
    end

    add_index :circle_connections, :circle_id
    # rename_table :user_circles, :circle_connections
  end
end
