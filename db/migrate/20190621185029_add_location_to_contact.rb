class AddLocationToContact < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_intros, :location, :string, default: ''
  end
end
