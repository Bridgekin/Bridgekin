import {
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_SIGNUP_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_SIGNUP_MODAL:
      return {};
    default:
      return state;
  }
};
