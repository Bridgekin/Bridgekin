namespace :renew_subscriptions do
  desc "Renew Subscriptions"
  task opps_contacts_summary: :environment do
    Subscription.includes(:payer, :product, :targetable).all.each do |sub|
      sub_date = sub.end_date
      tomorrow = DateTime.now.beginning_of_day + 1.day
      if sub.renewal && sub_date < tomorrow
        Subscription.renew_subscription
      end
    end
  end
end