class UpdateOpportunityTable < ActiveRecord::Migration[5.2]
  def up
    change_column :opportunities, :title, :string, null: false, default:''
    change_column :opportunities, :opportunity_need, :string, null: false, default:''

    remove_column :opportunities, :industries, :string
    remove_column :opportunities, :geography, :string

    add_column :opportunities, :industries, :string, array: true, null: false, default: []
    add_column :opportunities, :geography, :string, array: true, null: false, default: []

    change_column :opportunities, :value, :string, null: false, default:''

    add_column :opportunities, :deal_status, :string, null: false, default:''
  end

  def down
    change_column :opportunities, :title, :string, null: false
    change_column :opportunities, :opportunity_need, :string, null: false
    change_column :opportunities, :industries, :string, array:true, null: false
    change_column :opportunities, :geography, :string, array:true, null: false
    change_column :opportunities, :value, :string, null: false

    remove_column :opportunities, :deal_status, :string, null: false, default:''
  end
end

# change_column :opportunities, :industries, :string, array: true, default:[], using: "(string_to_array(industries, ','))"
# change_column :opportunities, :geography, :string, array: true, using: "(string_to_array(geography, ','))"
