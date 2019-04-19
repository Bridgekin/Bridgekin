class AddAnonymousToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :anonymous, :boolean, default: false
  end
end
