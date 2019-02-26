class AddInvitesRemainingToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :invites_remaining, :integer, default: 3
  end
end
