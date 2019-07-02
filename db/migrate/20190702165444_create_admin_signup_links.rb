class CreateAdminSignupLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :admin_signup_links do |t|
      t.string :code, null: false
      t.string :subscription, default: ''
      t.integer :network_id

      t.timestamps
    end
  end
end
