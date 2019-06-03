import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_LOGIN_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_LOGIN_MODAL:
      return {};
    default:
      return state;
  }
};
