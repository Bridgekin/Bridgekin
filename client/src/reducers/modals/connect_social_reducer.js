import {
  OPEN_CONNECT_SOCIAL_MODAL,
  CLOSE_CONNECT_SOCIAL_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_CONNECT_SOCIAL_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_CONNECT_SOCIAL_MODAL:
      return {};
    default:
      return state;
  }
};
