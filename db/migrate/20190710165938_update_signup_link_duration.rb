class UpdateSignupLinkDuration < ActiveRecord::Migration[5.2]
  def change
    remove_column :admin_signup_links, :duration
    remove_column :admin_signup_links, :renewal
  end
end
