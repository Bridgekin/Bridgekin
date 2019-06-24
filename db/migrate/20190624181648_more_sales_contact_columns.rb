class MoreSalesContactColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_contacts, :last_full_contact_lookup, :datetime
    add_column :sales_contacts, :facebook_url, :string
    add_column :sales_contacts, :linkedin_url, :string
    add_column :sales_contacts, :twitter_handle, :string
    add_column :sales_contacts, :location, :string
  end
end
