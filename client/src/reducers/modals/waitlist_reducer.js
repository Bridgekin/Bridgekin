import {
  OPEN_WAITLIST_MODAL,
  CLOSE_WAITLIST_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_WAITLIST_MODAL:
      return merge({}, {open: true, referred: action.referred });
    case CLOSE_WAITLIST_MODAL:
      return {};
    default:
      return state;
  }
};
