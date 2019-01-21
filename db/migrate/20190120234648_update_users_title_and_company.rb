class UpdateUsersTitleAndCompany < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :title, false, ''
    change_column_null :users, :company, false, ''
  end
end
