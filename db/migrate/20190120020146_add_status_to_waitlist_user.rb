class AddStatusToWaitlistUser < ActiveRecord::Migration[5.2]
  def change
    add_column :waitlist_users, :status, :string, null:false, default: 'Waitlist'
  end
end
