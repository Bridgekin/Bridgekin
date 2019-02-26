class CreateSiteTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :site_templates do |t|
      t.string :name
      t.integer :network_id, null: false
      t.boolean :test_feature, default: false
      t.timestamps
    end

    add_index :site_templates, :network_id
  end
end
