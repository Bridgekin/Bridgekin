class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.integer :recipient_id
      t.integer :actor_id
      t.string :action
      t.references :acted_with, polymorphic: true
      t.references :targetable, polymorphic: true
      t.datetime :read_at

      t.timestamps
    end

    add_index :notifications, :recipient_id
  end
end
