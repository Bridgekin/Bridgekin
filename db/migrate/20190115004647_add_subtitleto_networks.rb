class AddSubtitletoNetworks < ActiveRecord::Migration[5.2]
  def change
    add_column :networks, :subtitle, :string, default: ""
  end
end
