import { combineReducers } from 'redux';
import LoginErrorsReducer from './login_errors_reducer';
import UsersErrorsReducer from './user_errors_reducer';
import WaitlistUsersErrorsReducer from './waitlist_user_errors_reducer';
import OpportunityErrorsReducer from './opportunity_errors_reducer';
import ConnectedOpportunityErrorsReducer from './connected_opportunity_errors_reducer';

export default combineReducers({
  login: LoginErrorsReducer,
  users: UsersErrorsReducer,
  waitlistUsers: WaitlistUsersErrorsReducer,
  opportunities: OpportunityErrorsReducer,
  connectedOpportunities: ConnectedOpportunityErrorsReducer
});
