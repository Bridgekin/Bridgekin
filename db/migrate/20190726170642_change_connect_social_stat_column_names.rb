class ChangeConnectSocialStatColumnNames < ActiveRecord::Migration[5.2]
  def change
    rename_column :connect_social_stats, :linked_in_url, :linked_in_key
    rename_column :connect_social_stats, :google_url, :google_key
  end
end
