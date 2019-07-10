class GenerateFirstProduct < ActiveRecord::Migration[5.2]
  def change
    SalesProduct.create(
      seats: 5,
      monthly_amount: 300,
      yearly_amount: 3000
    )
  end
end
