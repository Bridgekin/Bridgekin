class AddEmailToEmailLog < ActiveRecord::Migration[5.2]
  def change
    add_column :email_logs, :email, :string
  end
end
