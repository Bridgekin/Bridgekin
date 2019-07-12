class AddReferralUnit < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_intros, :referral_unit, :string
  end
end
