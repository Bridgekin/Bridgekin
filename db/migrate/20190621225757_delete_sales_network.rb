class DeleteSalesNetwork < ActiveRecord::Migration[5.2]
  def change
    drop_table :sales_networks
  end
end
