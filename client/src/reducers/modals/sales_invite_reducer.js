import {
  OPEN_SALES_INVITE_MODAL,
  CLOSE_SALES_INVITE_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_SALES_INVITE_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_SALES_INVITE_MODAL:
      return {};
    default:
      return state;
  }
};
