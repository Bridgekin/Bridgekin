class AddBase5 < ActiveRecord::Migration[5.2]
  def change
    add_column :site_templates, :base5, :string
  end
end
