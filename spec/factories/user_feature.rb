FactoryBot.define do
  factory :user_feature do
    user
    imported_social { DateTime.now}
  end
end
