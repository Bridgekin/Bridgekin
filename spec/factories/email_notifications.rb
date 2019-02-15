FactoryBot.define do
  factory :email_notification do
    user

    trait :never_notify do
      notification_setting { 'Never' }
    end
  end
end
