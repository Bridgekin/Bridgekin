class CreateEmailTemplate < ActiveRecord::Migration[5.2]
  def change
    create_table :email_templates do |t|
      t.string :type, null: false
      t.string :subject, default: ''
      t.text :body, default: ''
      t.timestamps
    end

    add_index :email_templates, :type
  end
end
