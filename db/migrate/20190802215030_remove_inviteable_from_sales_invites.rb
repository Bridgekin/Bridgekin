class RemoveInviteableFromSalesInvites < ActiveRecord::Migration[5.2]
  def change
    remove_column :sales_invites, :inviteable_type
    remove_column :sales_invites, :inviteable_id
  end
end
