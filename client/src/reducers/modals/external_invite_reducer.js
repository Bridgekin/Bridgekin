import {
  OPEN_EXTERNAL_INVITE_MODAL,
  CLOSE_EXTERNAL_INVITE_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_EXTERNAL_INVITE_MODAL:
      return merge({}, {open: true, email: action.email});
    case CLOSE_EXTERNAL_INVITE_MODAL:
      return {};
    default:
      return state;
  }
};
