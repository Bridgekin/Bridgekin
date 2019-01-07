import { combineReducers } from 'redux';
import opportuntiesReducer from './opportunities_reducer';
import networkReducer from './networks_reducer';
import referralsReducer from './referrals_reducer';

export default combineReducers({
  opportunities: opportuntiesReducer,
  networks: networkReducer,
  referral: referralsReducer
});
