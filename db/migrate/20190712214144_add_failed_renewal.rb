class AddFailedRenewal < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :failed_renewal, :datetime
  end
end
