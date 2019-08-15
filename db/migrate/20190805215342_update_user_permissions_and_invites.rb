class UpdateUserPermissionsAndInvites < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_invites, :relationship, :string, default: ""
    add_column :sales_user_permissions, :relationship, :string, default: ""
  end
end
