import {
  OPEN_CUSTOM_EMAIL_MODAL,
  OPEN_CUSTOM_EMAIL_WAITLIST_REFERRAL_MODAL,
  OPEN_CUSTOM_EMAIL_OPP_CARD_MODAL,
  CLOSE_CUSTOM_EMAIL_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_CUSTOM_EMAIL_MODAL:
      return merge({}, {open: true, type: action.templateType});
    case OPEN_CUSTOM_EMAIL_OPP_CARD_MODAL:
      return merge({}, {open: true, type: action.templateType,
        connectBool: action.connectBool, oppId: action.oppId });
    case OPEN_CUSTOM_EMAIL_WAITLIST_REFERRAL_MODAL:
      return merge({}, {open: true, type: action.templateType,
        email: action.email, fname: action.fname});
    case CLOSE_CUSTOM_EMAIL_MODAL:
      return {};
    default:
      return state;
  }
};
