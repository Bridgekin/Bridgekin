import { combineReducers } from 'redux';
import opportuntiesReducer from './opportunities_reducer';
import connectedOpportuntiesReducer from './connected_opportunities_reducer';
import facilitatedOpportuntiesReducer from './facilitated_opportunities_reducer';
import networkReducer from './networks_reducer';
import referralsReducer from './referrals_reducer';
import emailNotificationReducer from './email_notification_reducer';
import managedNetworksReducer from './managed_networks_reducer.js';
import managedUsersReducer from './managed_users_reducer.js';

export default combineReducers({
  opportunities: opportuntiesReducer,
  connectedOpportunities: connectedOpportuntiesReducer,
  facilitatedOpportunities: facilitatedOpportuntiesReducer,
  networks: networkReducer,
  referral: referralsReducer,
  emailNotification: emailNotificationReducer,
  managedNetworks: managedNetworksReducer,
  managedUsers: managedUsersReducer
});
