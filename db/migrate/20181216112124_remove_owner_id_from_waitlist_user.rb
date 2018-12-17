class RemoveOwnerIdFromWaitlistUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :waitlist_users, :owner_id
  end
end
