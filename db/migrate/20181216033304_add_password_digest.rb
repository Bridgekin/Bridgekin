class AddPasswordDigest < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :password_digest, :string, null:false
  end
end
