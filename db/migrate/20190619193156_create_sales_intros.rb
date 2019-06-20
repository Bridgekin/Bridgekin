class CreateSalesIntros < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_intros do |t|
      t.integer :contact_id
      t.integer :requestor_id
      t.integer :recipient_id
      t.string :message
      t.string :explaination
      t.integer :referral_bonus

      t.timestamps
    end

    add_index :sales_intros, :requestor_id
    add_index :sales_intros, :recipient_id
  end
end
