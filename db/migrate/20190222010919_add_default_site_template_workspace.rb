class AddDefaultSiteTemplateWorkspace < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :default_network_id, :integer
  end
end
