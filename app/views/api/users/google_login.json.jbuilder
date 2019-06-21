json.partial! 'api/users/sessions/session',
variables: {
  currentUser: @user,
  users: @users,
  token: @token,
  site_template: @site_template,
  user_feature: @user_feature,
  connections: @connections
}

