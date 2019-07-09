class UpdateAdminSignupLink < ActiveRecord::Migration[5.2]
  def change
    remove_column :admin_signup_links, :subscription

    add_column :admin_signup_links, :duration, :string
    add_column :admin_signup_links, :renewal, :boolean
    add_column :admin_signup_links, :seats, :integer
    add_column :admin_signup_links, :amount, :integer
  end
end
