class AddFlagsForNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notification_settings, :email_opps_shared_direct, :boolean, default: true
    add_column :notification_settings, :email_invites_requested, :boolean, default: true
    add_column :notification_settings, :email_opps_shared_contacts, :string, default: 'Weekly'
    add_column :notification_settings, :email_opps_shared_communities, :string, default: 'Weekly'
  end
end
