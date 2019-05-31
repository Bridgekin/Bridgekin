class ChangeSalaryToCompensation < ActiveRecord::Migration[5.2]
  def change
    remove_column :ref_opportunities, :salary
    add_column :ref_opportunities, :compensation, :string
  end
end