class UpdateRefOppColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :ref_opportunities, :status, :string
    add_column :ref_opportunities, :type_of_position, :string
    add_column :ref_opportunities, :views, :integer

    add_column :ref_applications, :status, :string
  end
end
