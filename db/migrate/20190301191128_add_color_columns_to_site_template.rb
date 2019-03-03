class AddColorColumnsToSiteTemplate < ActiveRecord::Migration[5.2]
  def change
    add_column :site_templates, :base1, :string
    add_column :site_templates, :base2, :string
    add_column :site_templates, :base3, :string
    add_column :site_templates, :base4, :string

    add_column :site_templates, :font1, :string
    add_column :site_templates, :font2, :string

    add_column :site_templates, :button1, :string
    add_column :site_templates, :button2, :string

    add_column :site_templates, :border1, :string
    add_column :site_templates, :border2, :string
  end
end
