class CreateRefOppApplications < ActiveRecord::Migration[5.2]
  def change
    create_table :ref_applications do |t|
      t.string :fname
      t.string :lname
      t.string :email
      t.text :description
      t.string :referral_code
      t.integer :ref_opp_id
      t.integer :direct_referrer_id
      t.integer :candidate_id
      t.timestamps
    end

    add_index :ref_applications, :ref_opp_id
  end
end
