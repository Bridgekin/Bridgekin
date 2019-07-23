class CreateRequestTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :request_templates do |t|
      t.integer :user_id
      t.string :name
      t.string :subject
      t.string :body

      t.timestamps
    end

    add_index :request_templates, :user_id
  end
end
