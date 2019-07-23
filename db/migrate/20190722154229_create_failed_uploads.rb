class CreateFailedUploads < ActiveRecord::Migration[5.2]
  def change
    create_table :failed_uploads do |t|
      t.string :uploader_id
      t.string :source
      t.string :fname
      t.string :lname
      t.string :email
      t.string :company
      t.string :position

      t.timestamps
    end

    add_index :failed_uploads, :uploader_id
  end
end
