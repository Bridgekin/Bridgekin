class AddSearchableToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :searchable, :boolean, default: true
  end
end
