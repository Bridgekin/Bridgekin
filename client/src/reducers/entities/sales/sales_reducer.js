import { combineReducers } from 'redux';

import searchNetworksReducer from './search_networks_reducer.js';
import searchContactsReducer from './search_contacts_reducer.js';
import salesIntrosReducer from './sales_intro_reducer.js';
import salesContactsReducer from './sales_contact_reducer.js';
import receivedRequestsReducer from './received_request_reducer.js';
import sentRequestsReducer from './sent_request_reducer.js';

export default combineReducers({
  searchNetworks: searchNetworksReducer,
  searchContacts: searchContactsReducer,
  salesIntros: salesIntrosReducer,
  salesContacts: salesContactsReducer,
  receivedRequests: receivedRequestsReducer,
  sentRequests: sentRequestsReducer,
})