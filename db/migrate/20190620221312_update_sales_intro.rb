class UpdateSalesIntro < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_intros, :decision, :string
    add_column :sales_intros, :email_sent, :datetime
  end
end
