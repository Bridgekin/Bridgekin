class AddOriginRelationshipToNotification < ActiveRecord::Migration[5.2]
  def change
    # add_column :notifications, :origin, :references, polymorphic: true
    add_reference(:notifications, :origin, polymorphic: true, index: true)
  end
end
