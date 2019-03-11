import { combineReducers } from 'redux';
import loginErrorsReducer from './login_errors_reducer';
import usersErrorsReducer from './user_errors_reducer';
import waitlistUsersErrorsReducer from './waitlist_user_errors_reducer';
import opportunityErrorsReducer from './opportunity_errors_reducer';
import connectedOpportunityErrorsReducer from './connected_opportunity_errors_reducer';
import siteTemplateErrorsReducer from './site_template_errors_reducer';
import connectionErrorsReducer from './connection_errors_reducer';

export default combineReducers({
  login: loginErrorsReducer,
  users: usersErrorsReducer,
  waitlistUsers: waitlistUsersErrorsReducer,
  opportunities: opportunityErrorsReducer,
  connectedOpportunities: connectedOpportunityErrorsReducer,
  siteTemplate: siteTemplateErrorsReducer,
  connection: connectionErrorsReducer,
});
