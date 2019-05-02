class AddDefaultLinkedIn < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:users, :linked_in_url, '')
  end
end
