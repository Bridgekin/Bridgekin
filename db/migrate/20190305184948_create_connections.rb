class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.integer :user_id
      t.integer :friend_id
      t.string :status, default: 'Pending'
      t.timestamps
    end

    add_index :connections, :user_id
    add_index :connections, :friend_id
  end
end
