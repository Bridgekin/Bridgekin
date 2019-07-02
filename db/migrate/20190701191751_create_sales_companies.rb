class CreateSalesCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_companies do |t|
      t.string :title, default: ''
      t.string :domain, default: ''
      t.string :logo_url, default: ''
      t.datetime :last_lookup
      t.timestamps
    end
  end
end
