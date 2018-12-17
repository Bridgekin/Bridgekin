class CreateWaitlistUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :waitlist_users do |t|
      t.integer :owner_id, null: false
      t.string :email, null: false
      t.string :name, null: false
      t.date :email_sent_at
      t.string :from_referral_id
      t.timestamps
    end

    add_index :waitlist_users, :email, unique: true
  end
end
