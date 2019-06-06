class AddPhoneNumbersToApps < ActiveRecord::Migration[5.2]
  def change
    add_column :ref_applications, :phone_number, :string, default: ''
  end
end
