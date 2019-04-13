class FixPreviousUpdate < ActiveRecord::Migration[5.2]
  def change
    remove_column :notification_settings, :email_recap_shared_contacts
    remove_column :notification_settings, :email_recap_shared_communities

    add_column :notification_settings, :email_recap_shared_contacts, :string, default: 'Never'
    add_column :notification_settings, :email_recap_shared_communities, :string, default: 'Weekly'
  end
end
