class CreateUserFeatures < ActiveRecord::Migration[5.2]
  def change
    create_table :user_features do |t|
      t.integer :user_id
      t.datetime :tutorial_tour_date
      t.integer :tutorial_tour_step, default: 0
      t.datetime :user_onboarding
      t.timestamps
    end

    add_index :user_features, :user_id
  end
end
