class UpdateEmailNotificationSettings < ActiveRecord::Migration[5.2]
  def change
    remove_column :notification_settings, :email_opps_shared_contacts
    remove_column :notification_settings, :email_opps_shared_communities

    add_column :notification_settings, :email_opps_shared_contacts, :boolean, default: true
    add_column :notification_settings, :email_opps_shared_communities, :boolean, default: true
    add_column :notification_settings, :email_recap_shared_contacts, :boolean, default: 'Never'
    add_column :notification_settings, :email_recap_shared_communities, :boolean, default: 'Weekly'
  end
end
