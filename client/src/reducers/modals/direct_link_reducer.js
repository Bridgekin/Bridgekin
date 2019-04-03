import {
  OPEN_DIRECT_LINK_MODAL,
  CLOSE_DIRECT_LINK_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_DIRECT_LINK_MODAL:
      return merge({}, {open: true});
    case CLOSE_DIRECT_LINK_MODAL:
      return {};
    default:
      return state;
  }
};
