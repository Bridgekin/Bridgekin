class AddStatusToInviteForSalesInvites < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_invites, :status, :string, default: "pending"
  end
end
