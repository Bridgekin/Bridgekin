class AddSubjectBodyToSalesIntros < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_intros, :intro_subject, :string
    add_column :sales_intros, :intro_body, :string
  end
end
