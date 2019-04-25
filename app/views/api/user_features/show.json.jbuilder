json.user_feature do
  json.partial! 'api/user_features/user_feature',
  user_feature: @user_feature
end
