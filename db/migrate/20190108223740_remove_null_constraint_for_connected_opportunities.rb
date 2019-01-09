class RemoveNullConstraintForConnectedOpportunities < ActiveRecord::Migration[5.2]
  def change
    change_column :connected_opportunities, :user_id, :integer, :null => true
  end
end
