class AddPhoneNumberForUser < ActiveRecord::Migration[5.2]
  def change
    add_column :ref_applications, :has_license, :boolean, default: false
    add_column :ref_applications, :allows_screening, :boolean, default: false
    add_column :ref_applications, :availability, :string, default: ''

    rename_column :users, :phone, :phone_number
  end
end
