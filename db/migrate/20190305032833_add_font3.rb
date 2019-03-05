class AddFont3 < ActiveRecord::Migration[5.2]
  def change
    add_column :site_templates, :font3, :string
  end
end
