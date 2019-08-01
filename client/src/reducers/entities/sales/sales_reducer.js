import { combineReducers } from 'redux';

import searchNetworksReducer from './search_networks_reducer.js';
import searchContactsReducer from './search_contacts_reducer.js';
import salesIntrosReducer from './sales_intro_reducer.js';
import salesContactsReducer from './sales_contact_reducer.js';
import receivedRequestsReducer from './received_request_reducer.js';
import sentRequestsReducer from './sent_request_reducer.js';
import friendMapReducer from './friend_map_reducer.js'
import adminSignupLinkReducer from './admin_signup_link_reducer.js'
import networkDetailsReducer from './network_detail_reducer.js'

import currentDashboardTargetReducer from './current_dashboard_target_reducer.js'

import salesProductReducer from './sales_product_reducer.js'
import salesNetworkInvitesReducer from './sales_network_invite_reducer.js'
import networkAdminMapReducer from './sales_network_admin_reducer.js'
import salesNetworksReducer from './sales_network_reducer.js'
import salesUserPermissionsReducer from './sales_user_permission_reducer.js'
import salesAdminNetworksReducer from './sales_admin_network_reducer.js'
import requestTemplatesReducer from './request_template_reducer.js'

export default combineReducers({
  searchNetworks: searchNetworksReducer,
  searchContacts: searchContactsReducer,
  salesIntros: salesIntrosReducer,
  salesContacts: salesContactsReducer,
  receivedRequests: receivedRequestsReducer,
  sentRequests: sentRequestsReducer,
  friendMap: friendMapReducer,
  adminSignupLink: adminSignupLinkReducer,
  networkDetails: networkDetailsReducer,

  currentDashboardTarget: currentDashboardTargetReducer,

  salesProducts: salesProductReducer,
  salesNetworkInvites: salesNetworkInvitesReducer,
  networkAdminMap: networkAdminMapReducer,
  salesNetworks: salesNetworksReducer,
  salesUserPermissions: salesUserPermissionsReducer,
  salesAdminNetworks: salesAdminNetworksReducer,
  requestTemplates: requestTemplatesReducer
})