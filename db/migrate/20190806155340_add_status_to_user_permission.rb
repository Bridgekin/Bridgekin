class AddStatusToUserPermission < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_user_permissions, :status, :string, default: 'pending'
    add_column :sales_user_permissions, :last_confirmed, :datetime
  end
end
