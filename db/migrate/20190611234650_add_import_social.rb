class AddImportSocial < ActiveRecord::Migration[5.2]
  def change
    add_column :user_features, :imported_social, :datetime
  end
end