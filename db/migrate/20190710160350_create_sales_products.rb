class CreateSalesProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_products do |t|
      t.integer :seats
      t.integer :monthly_amount
      t.integer :yearly_amount
      
      t.timestamps
    end
  end
end
