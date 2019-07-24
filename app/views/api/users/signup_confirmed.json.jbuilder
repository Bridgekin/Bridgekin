json.partial! 'api/users/sessions/session',
variables: {
  currentUser: @current_user,
  users: @users,
  token: @token,
  user_feature: @user_feature,
  sales_networks: @sales_networks,
  network_details: @network_details,
  current_network_id: @current_network_id,
  sales_user_networks: @sales_user_networks,
  sales_admin_networks: @sales_admin_networks
}