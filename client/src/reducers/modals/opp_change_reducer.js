import {
  OPEN_OPP_CHANGE_MODAL,
  CLOSE_OPP_CHANGE_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_OPP_CHANGE_MODAL:
      return merge({}, {open: true }, action.payload);
    case CLOSE_OPP_CHANGE_MODAL:
      return {};
    default:
      return state;
  }
};
