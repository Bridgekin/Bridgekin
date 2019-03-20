class AddMassFlag < ActiveRecord::Migration[5.2]
  def change
    add_column :opp_permissions, :mass, :boolean, default: false
  end
end
