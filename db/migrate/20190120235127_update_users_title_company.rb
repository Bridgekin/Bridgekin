class UpdateUsersTitleCompany < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :title, :string, null: false, default: ''
    change_column :users, :company, :string, null: false, default: ''
  end
end
