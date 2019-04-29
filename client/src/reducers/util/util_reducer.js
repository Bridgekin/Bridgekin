import { combineReducers } from 'redux';
import tourSessionReducer from './tour_session_reducer.js';
import windowReducer from './window_reducer.js';

export default combineReducers({
  tourSession: tourSessionReducer,
  window: windowReducer,
});
