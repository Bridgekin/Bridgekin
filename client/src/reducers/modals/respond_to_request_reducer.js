import {
  OPEN_REQUEST_TO_REQUEST_MODAL,
  CLOSE_REQUEST_TO_REQUEST_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_REQUEST_TO_REQUEST_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_REQUEST_TO_REQUEST_MODAL:
      return {};
    default:
      return state;
  }
};
