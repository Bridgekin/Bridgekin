import { combineReducers } from 'redux';
import inviteReducer from './invite_reducer';
import createCircleReducer from './create_circle_reducer';
import circleReducer from './circle_reducer';
import customEmailReducer from './custom_email_reducer';
import waitlistReducer from './waitlist_reducer';
import oppCardReducer from './opp_card_reducer';
import updateUserReducer from './update_user_reducer';
import directLinkReducer from './direct_link_reducer';
import oppChangeReducer from './opp_change_reducer';
import imageCropReducer from './image_crop_reducer';
import submitOppReducer from './submit_opp_reducer';
import deleteOppReducer from './delete_opp_reducer';
import externalInviteReducer from './external_invite_reducer';
import signupReducer from './signup_reducer';
import loginReducer from './login_reducer';
import refApplicationReducer from './ref_application_reducer';
import refAppStatusReducer from './ref_app_status_reducer';
import requestIntroReducer from './request_intro_reducer';
import connectSocialReducer from './connect_social_reducer';
import respondToRequestReducer from './respond_to_request_reducer';
import salesInviteReducer from './sales_invite_reducer';

export default combineReducers({
  invite: inviteReducer,
  createCircle: createCircleReducer,
  circle: circleReducer,
  customEmail: customEmailReducer,
  waitlist: waitlistReducer,
  oppCard: oppCardReducer,
  updateUser: updateUserReducer,
  directLink: directLinkReducer,
  oppChange: oppChangeReducer,
  imageCrop: imageCropReducer,
  submitOpp: submitOppReducer,
  deleteOpp: deleteOppReducer,
  externalInvite: externalInviteReducer,
  signup: signupReducer,
  login: loginReducer,
  refApplication: refApplicationReducer,
  refAppStatus: refAppStatusReducer,
  requestIntro: requestIntroReducer,
  connectSocial: connectSocialReducer,
  respondToRequest: respondToRequestReducer,
  salesInvite: salesInviteReducer,
});
