class AddStatusToSalesIntro < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_intros, :status, :string, default: 'open'
  end
end
