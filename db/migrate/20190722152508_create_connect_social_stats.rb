class CreateConnectSocialStats < ActiveRecord::Migration[5.2]
  def change
    create_table :connect_social_stats do |t|
      t.integer :uploader_id
      t.string :linked_in_url
      t.string :google_url
      t.string :status, default: 'started'
      t.integer :retry_count, default: 0

      t.timestamps
    end

    add_index :connect_social_stats, :uploader_id
  end
end
