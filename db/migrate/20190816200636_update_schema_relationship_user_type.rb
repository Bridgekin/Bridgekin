class UpdateSchemaRelationshipUserType < ActiveRecord::Migration[5.2]
  def change
    remove_column :sales_user_permissions, :member_type, :string
    remove_column :sales_invites, :user_type, :string
  end
end
