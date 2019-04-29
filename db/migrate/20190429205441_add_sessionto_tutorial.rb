class AddSessiontoTutorial < ActiveRecord::Migration[5.2]
  def change
    add_column :user_features, :tutorial_tour_session, :datetime
  end
end
