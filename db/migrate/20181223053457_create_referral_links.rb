class CreateReferralLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :referral_links do |t|
      t.string :referral_code, null: false, unique: true
      t.integer :member_id,  null: false
      t.integer :network_id,  null: false

      t.timestamps
    end

    add_index :referral_links, :referral_code
    add_index :referral_links, [:member_id, :network_id], unique: true

    add_column :users, :referred_by_id, :integer
  end
end
