class AddFriendableToReferralLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :referral_links, :is_friendable, :boolean, default: true
  end
end
