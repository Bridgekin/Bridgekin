class UpdateUsersMembershipAndPasswordDigest < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :membership_type
    remove_column :users, :password_digest

    add_column :users, :membership_type, :string, null: false, default: 'full'
  end
end
