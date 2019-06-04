import {
  OPEN_REF_APP_STATUS_MODAL,
  CLOSE_REF_APP_STATUS_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_REF_APP_STATUS_MODAL:
      return merge({}, {open: true}, action.payload);
    case CLOSE_REF_APP_STATUS_MODAL:
      return {};
    default:
      return state;
  }
};
