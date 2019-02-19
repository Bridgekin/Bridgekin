class AddAnonymousOpportunity < ActiveRecord::Migration[5.2]
  def change
    add_column :opportunities, :anonymous, :boolean, default: true
  end
end
