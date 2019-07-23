class TrackSearchTerms < ActiveRecord::Migration[5.2]
  def change
    create_table :track_search_terms do |t|
      t.string :user_id
      t.string :fname
      t.string :lname
      t.string :company
      t.string :position
      t.string :location
      t.timestamps
    end

    add_index :track_search_terms, :user_id
  end
end
