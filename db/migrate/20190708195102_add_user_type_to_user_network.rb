class AddUserTypeToUserNetwork < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_user_networks, :member_type, :string, default: "full"
  end
end
