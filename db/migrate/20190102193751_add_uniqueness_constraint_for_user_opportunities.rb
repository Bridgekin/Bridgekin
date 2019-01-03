class AddUniquenessConstraintForUserOpportunities < ActiveRecord::Migration[5.2]
  def change
    add_index :opportunities, [:owner_id, :title], unique: true
  end
end
