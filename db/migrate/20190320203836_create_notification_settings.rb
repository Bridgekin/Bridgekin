class CreateNotificationSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :notification_settings do |t|
      t.integer :user_id
      t.boolean :opps_shared_direct, default: true
      t.boolean :opps_shared_contacts, default: true
      t.boolean :opps_shared_communities, default: true
      t.boolean :invites_requested, default: true
      t.boolean :opps_acknowledged, default: true

      t.timestamps
    end
  end
end
