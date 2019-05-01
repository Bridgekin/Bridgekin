class AddSocialLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :linked_in_url, :string
  end
end
