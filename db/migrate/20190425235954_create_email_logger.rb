class CreateEmailLogger < ActiveRecord::Migration[5.2]
  def change
    create_table :email_logs do |t|
      t.integer :recipient_id
      t.string :email_type
      t.integer :sender_id
      t.timestamps
    end

    add_index :email_logs, :recipient_id
  end
end
