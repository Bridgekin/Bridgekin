class RenameOpportunityNeed < ActiveRecord::Migration[5.2]
  def change
    rename_column :opportunities, :opportunity_needs, :opportunity_need
  end
end
