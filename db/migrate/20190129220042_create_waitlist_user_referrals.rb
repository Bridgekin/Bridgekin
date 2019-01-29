class CreateWaitlistUserReferrals < ActiveRecord::Migration[5.2]
  def change
    create_table :waitlist_user_referrals do |t|
      t.integer :waitlist_user_id, null: false
      t.integer :from_referral_id, null: false
      t.timestamps
    end

    add_index :waitlist_user_referrals, :waitlist_user_id
  end
end
