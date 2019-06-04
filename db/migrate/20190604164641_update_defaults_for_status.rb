class UpdateDefaultsForStatus < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:ref_applications, :status, 'open')
    change_column_default(:ref_opportunities, :status, 'open')
  end
end
