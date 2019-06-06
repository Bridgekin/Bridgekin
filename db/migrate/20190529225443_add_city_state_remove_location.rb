class AddCityStateRemoveLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :ref_opportunities, :city, :string
    add_column :ref_opportunities, :state, :string

    remove_column :ref_opportunities, :location
  end
end
