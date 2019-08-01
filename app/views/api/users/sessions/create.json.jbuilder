json.partial! 'api/users/sessions/session',
variables: {
  currentUser: @current_user,
  users: @users,
  token: @token,
  user_feature: @user_feature,
  sales_networks: @sales_networks,
  network_details: @network_details,
  sales_user_permissions: @sales_user_permissions,
  sales_admin_networks: @sales_admin_networks
}