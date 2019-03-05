import { combineReducers } from 'redux';
import opportuntiesReducer from './opportunities_reducer';
import connectedOpportuntiesReducer from './connected_opportunities_reducer';
import facilitatedOpportuntiesReducer from './facilitated_opportunities_reducer';
import networkReducer from './networks_reducer';
import referralsReducer from './referrals_reducer';
import emailNotificationReducer from './email_notification_reducer';

import managedNetworksReducer from './managed_networks_reducer.js';
import memberUsersReducer from './member_users_reducer.js';
import networkOppsReducer from './network_opps_reducer.js';
import oppPermissionsReducer from './opp_permissions_reducer.js';
import userOpportunitiesReducer from './user_opportunities_reducer.js';
import workspaceNetworkReducer from './workspace_network_reducer.js';
import shareOptionsReducer from './share_options_reducer.js';
import connectionsReducer from './connections_reducer.js';

export default combineReducers({
  opportunities: opportuntiesReducer,
  connectedOpportunities: connectedOpportuntiesReducer,
  facilitatedOpportunities: facilitatedOpportuntiesReducer,
  networks: networkReducer,
  referral: referralsReducer,
  emailNotification: emailNotificationReducer,
  managedNetworks: managedNetworksReducer,
  memberUsers: memberUsersReducer,
  networkOpps: networkOppsReducer,
  oppPermissions: oppPermissionsReducer,
  userOpportunities: userOpportunitiesReducer,
  workspaceNetworks: workspaceNetworkReducer,
  shareOptions: shareOptionsReducer,
  connections: connectionsReducer
});
