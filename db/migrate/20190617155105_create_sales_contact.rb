class CreateSalesContact < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_contacts do |t|
      t.string :email, default: ''
      t.string :fname, default: ''
      t.string :lname, default: ''
      t.string :company, default: ''
      t.string :position, default: ''

      t.boolean :linked_in, default: ''
      t.boolean :google, default: ''
      t.boolean :facebook, default: ''

      t.timestamps
    end
  end
end
