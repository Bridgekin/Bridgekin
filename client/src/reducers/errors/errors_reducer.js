import { combineReducers } from 'redux';
import loginErrorsReducer from './login_errors_reducer';
import usersErrorsReducer from './user_errors_reducer';
import waitlistUsersErrorsReducer from './waitlist_user_errors_reducer';
import opportunityErrorsReducer from './opportunity_errors_reducer';
import connectedOpportunityErrorsReducer from './connected_opportunity_errors_reducer';
import siteTemplateErrorsReducer from './site_template_errors_reducer';
import connectionErrorsReducer from './connection_errors_reducer';
import circleErrorsReducer from './circle_errors_reducer';
import emailTemplateErrorsReducer from './email_template_errors_reducer';
import directLinkErrorsReducer from './direct_link_errors_reducer';
import refApplicationErrorsReducer from './ref_application_errors_reducer';
import salesIntroErrorsReducer from './sales_intro_errors_reducer';
import salesInviteErrorsReducer from './sales_invite_errors_reducer';
import requestTemplateErrorsReducer from './request_template_errors_reducer';

export default combineReducers({
  login: loginErrorsReducer,
  users: usersErrorsReducer,
  waitlistUsers: waitlistUsersErrorsReducer,
  opportunities: opportunityErrorsReducer,
  connectedOpportunities: connectedOpportunityErrorsReducer,
  siteTemplate: siteTemplateErrorsReducer,
  connection: connectionErrorsReducer,
  circle: circleErrorsReducer,
  emailTemplate: emailTemplateErrorsReducer,
  directLink: directLinkErrorsReducer,
  refApplication: refApplicationErrorsReducer,
  salesIntro: salesIntroErrorsReducer,
  salesInvite: salesInviteErrorsReducer,
  requestTemplate: requestTemplateErrorsReducer
});
