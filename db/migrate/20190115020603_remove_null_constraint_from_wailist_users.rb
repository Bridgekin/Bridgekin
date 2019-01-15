class RemoveNullConstraintFromWailistUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :waitlist_users, :lname, :string, null: true
  end
end
