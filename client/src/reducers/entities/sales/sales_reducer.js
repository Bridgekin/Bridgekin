import { combineReducers } from 'redux';

import searchNetworksReducer from './search_networks_reducer.js';

export default combineReducers({
  searchNetworks: searchNetworksReducer
})