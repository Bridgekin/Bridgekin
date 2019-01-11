class CreateEmailNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :email_notifications do |t|
      t.integer :user_id, null:false
      t.string :notification_setting, null:false, default: 'Weekly'
      t.timestamps
    end

    add_index :email_notifications, :user_id, unique: true
  end
end
