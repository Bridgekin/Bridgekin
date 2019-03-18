import {
  OPEN_CREATE_CIRCLE_MODAL,
  CLOSE_CREATE_CIRCLE_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_CREATE_CIRCLE_MODAL:
      return merge({}, {open: true });
    case CLOSE_CREATE_CIRCLE_MODAL:
      return {};
    default:
      return state;
  }
};
