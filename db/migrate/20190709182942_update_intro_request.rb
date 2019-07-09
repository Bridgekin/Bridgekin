class UpdateIntroRequest < ActiveRecord::Migration[5.2]
  def change
    rename_column :sales_intros, :status, :deal_status
    add_column :sales_intros, :request_status, :string, default: 'open'
  end
end
