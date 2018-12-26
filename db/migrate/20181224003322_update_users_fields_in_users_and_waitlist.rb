class UpdateUsersFieldsInUsersAndWaitlist < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :name
    remove_column :users, :session_token

    add_column :users, :fname, :string, null: false
    add_column :users, :lname, :string, null: false

    remove_column :waitlist_users, :name

    add_column :waitlist_users, :fname, :string, null: false
    add_column :waitlist_users, :lname, :string, null: false
  end
end
