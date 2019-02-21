class RemoveIndexOpportunities < ActiveRecord::Migration[5.2]
  def change
    # remove_index :opportunities, :owner_id
    remove_index :opportunities, [:owner_id, :title]
  end
end

# remove_index :opportunities, [:owner_id, :title]
