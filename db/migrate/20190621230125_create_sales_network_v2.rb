class CreateSalesNetworkV2 < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_networks do |t|
      t.string :title, default: ''
      t.string :domain, default: ''

      t.timestamps
    end
  end
end
