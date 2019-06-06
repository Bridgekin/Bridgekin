class AddInitialPostFlowUserFeature < ActiveRecord::Migration[5.2]
  def change
    add_column :user_features, :initial_posting_date, :datetime
  end
end
