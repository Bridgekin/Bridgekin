class Rename < ActiveRecord::Migration[5.2]
  def change
    rename_column :ref_opportunities, :incentive_hire, :hire_incentive
    rename_column :ref_opportunities, :incentive_interview, :interview_incentive
  end
end
