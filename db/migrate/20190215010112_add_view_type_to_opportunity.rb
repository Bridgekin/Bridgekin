class AddViewTypeToOpportunity < ActiveRecord::Migration[5.2]
  def change
    add_column :opportunities, :view_type, :string, null: false, default: 'card'
  end
end
