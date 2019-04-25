json.partial! 'api/users/sessions/session',
variables: {
  user: @user,
  token: @token,
  site_template: @site_template,
  user_feature: @user_feature
}
