class AddHireUserToUserFeature < ActiveRecord::Migration[5.2]
  def change
    add_column :user_features, :hire_user, :boolean, default: false
  end
end
