class UpdateCirclesImplementation < ActiveRecord::Migration[5.2]
  def change
    Circle.destroy_all

    remove_column :user_circles, :member_id
    add_column :user_circles, :connection_id, :integer
  end
end
