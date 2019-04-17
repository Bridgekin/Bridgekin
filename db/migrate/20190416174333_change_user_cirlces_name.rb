class ChangeUserCirlcesName < ActiveRecord::Migration[5.2]
  def change
    rename_table :user_circles, :circle_connections
  end
end
