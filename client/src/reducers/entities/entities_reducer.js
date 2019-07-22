import { combineReducers } from 'redux';

import emailNotificationReducer from './notifications/email_notification_reducer';
import notificationsReducer from './notifications/notifications_reducer';
import notificationSettingsReducer from './notifications/notification_settings_reducer';

import emailTemplateReducer from '../deprecated/email_template_reducer.js/index.js';
import profileOpportunityReducer from './opportunities/profile_opportunities_reducer.js';
import passedOpportunityReducer from './opportunities/passed_opportunities_reducer.js';
import networkOppPermissionsReducer from './opp_permissions/network_opp_permissions_reducer.js';
import sessionOpportunityReducer from './opportunities/session_opportunities_reducer.js';

import userMetricsReducer from './users/user_metrics_reducer.js';
import userFeatureReducer from './users/user_feature_reducer.js';
import userIndexOppPermissionsReducer from './opp_permissions/user_index_opp_permissions_reducer.js';

import circlesReducer from './circles/circles_reducer.js';
import circleConnectionsReducer from './circles/circle_connections_reducer.js';

import googleMatchedContactsReducer from './google/contacts_reducer.js';

import hiringReducer from './hiring/hiring_reducer';
import salesReducer from './sales/sales_reducer';

export default combineReducers({
  emailNotification: emailNotificationReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  emailTemplate: emailTemplateReducer,
  profileOpportunities: profileOpportunityReducer,
  passedOpportunities: passedOpportunityReducer,
  userMetrics: userMetricsReducer,
  networkOppPermissions: networkOppPermissionsReducer,
  userOppPermissions: userIndexOppPermissionsReducer,
  circles: circlesReducer,
  circleConnections: circleConnectionsReducer,
  userFeature: userFeatureReducer,
  sessionOpportunities: sessionOpportunityReducer,
  googleMatchedContacts: googleMatchedContactsReducer,
  hiring: hiringReducer,
  sales: salesReducer
});
