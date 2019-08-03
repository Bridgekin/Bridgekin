class AddUserPermissionIdToSalesInvites < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_invites, :user_permission_id, :integer
  end
end
