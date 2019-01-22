class AddRecipientIdToReferralLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :referral_links, :recipient_id, :integer
    add_column :referral_links, :status, :string, null: false, default: 'Active'
    add_column :referral_links, :usage_type, :string, null: false, default: 'Single'

    remove_index :referral_links, column: ["member_id", "network_id"]

    add_index :referral_links, :member_id
    add_index :referral_links, :recipient_id
  end
end
