import {
  OPEN_CUSTOM_EMAIL_MODAL,
  CLOSE_CUSTOM_EMAIL_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_CUSTOM_EMAIL_MODAL:
      return merge({}, {open: true});
    case CLOSE_CUSTOM_EMAIL_MODAL:
      return {};
    default:
      return state;
  }
};
