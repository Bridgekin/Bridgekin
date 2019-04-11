import { combineReducers } from 'redux';
import opportuntiesReducer from './opportunities_reducer';
import connectedOpportuntiesReducer from './connected_opportunities_reducer';
import facilitatedOpportuntiesReducer from './facilitated_opportunities_reducer';
import networkReducer from './networks_reducer';
import referralsReducer from './referrals_reducer';

import emailNotificationReducer from './notifications/email_notification_reducer';
import notificationsReducer from './notifications/notifications_reducer';
import notificationSettingsReducer from './notifications/notification_settings_reducer';

import managedNetworksReducer from './managed_networks_reducer.js';
import memberUsersReducer from './member_users_reducer.js';
import networkOppsReducer from './network_opps_reducer.js';
import oppPermissionsReducer from './opp_permissions_reducer.js';
import userOpportunitiesReducer from './user_opportunities_reducer.js';
import workspaceOptionsReducer from './workspace_options_reducer.js';

import shareOptionsReducer from './share_options_reducer.js';
import connectionsReducer from './connections_reducer.js';
import searchResultsReducer from './search_results_reducer.js';
import searchResultsPageReducer from './search_results_page_reducer.js';
import circlesReducer from './circles_reducer.js';
import circlesMembersReducer from './circles_members_reducer.js';
import emailTemplateReducer from './email_template_reducer.js';
import savedOpportunityReducer from './saved_opportunities_reducer.js';
import profileOpportunityReducer from './opportunities/profile_opportunities_reducer.js';
import directLinkReducer from './direct_links_reducer.js';
import passedOpportunityReducer from './opportunities/passed_opportunities_reducer.js';
import userMetricsReducer from './users/user_metrics_reducer.js';

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
  workspaceOptions: workspaceOptionsReducer,
  shareOptions: shareOptionsReducer,
  connections: connectionsReducer,
  searchResults: searchResultsReducer,
  searchResultsPage: searchResultsPageReducer,
  circles: circlesReducer,
  circleMembers: circlesMembersReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  emailTemplate: emailTemplateReducer,
  savedOpportunities: savedOpportunityReducer,
  profileOpportunities: profileOpportunityReducer,
  directLink: directLinkReducer,
  passedOpportunities: passedOpportunityReducer,
  userMetrics: userMetricsReducer
});
