class AddCompanyAndTitleToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :title, :string
    add_column :users, :company, :string
  end
end
