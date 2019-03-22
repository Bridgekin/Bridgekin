class AddMessageCollumn < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :message, :string, default: ''
  end
end
