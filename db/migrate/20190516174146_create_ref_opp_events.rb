class CreateRefOppEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :ref_opp_events do |t|
      t.integer :owner_id
      t.string :logged_out_email
      t.string :event
      t.integer :ref_opp_id
      t.integer :ref_opp_link_id
      t.timestamps
    end
  end
end
