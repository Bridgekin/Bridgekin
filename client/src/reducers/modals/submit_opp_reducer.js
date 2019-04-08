import {
  OPEN_SUBMIT_OPP_MODAL,
  CLOSE_SUBMIT_OPP_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_SUBMIT_OPP_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_SUBMIT_OPP_MODAL:
      return {};
    default:
      return state;
  }
};
