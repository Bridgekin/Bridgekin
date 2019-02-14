class UpdateOpportunityTable < ActiveRecord::Migration[5.2]
  def up
    change_column :opportunities, :title, :string, null: false, default:''
    change_column :opportunities, :opportunity_need, :string, null: false, default:''
    change_column :opportunities, :industries, :string, array: true, null: false, default: []
    change_column :opportunities, :geography, :string, array: true, null: false, default: []
    change_column :opportunities, :value, :string, null: false, default:''
    change_column :opportunities, :status, :string, null: false, default:'Pending'

    add_column :opportunities, :deal_status, :string, null: false, default:'Active'
  end

  def down
    change_column :opportunities, :title, :string, null: false, default: nil
    change_column :opportunities, :opportunity_need, :string, null: false, default: nil
    change_column :opportunities, :industries, :string, array:true, null: false, default: nil
    change_column :opportunities, :geography, :string, array:true, null: false, default: nil
    change_column :opportunities, :value, :string, null: false, default: nil
    change_column :opportunities, :status, :string, null: false, default: nil

    remove_column :opportunities, :deal_status, :string, null: false, default:''
  end
end

# change_column :opportunities, :industries, :string, array: true, default:[], using: "(string_to_array(industries, ','))"
# change_column :opportunities, :geography, :string, array: true, using: "(string_to_array(geography, ','))"
