class CreateRequestDemo < ActiveRecord::Migration[5.2]
  def change
    create_table :demo_requests do |t|
      t.string :fname, default: ''
      t.string :lname, default: ''
      t.string :email, default: ''
      t.string :demo_type, default: ''

      t.timestamps
    end
  end
end