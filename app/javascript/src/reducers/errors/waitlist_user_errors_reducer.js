import {
  RECEIVE_WAITLIST_USER_ERRORS,
  CLEAR_WAITLIST_USER_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_WAITLIST_USER_ERRORS:
      return action.errors;
    case CLEAR_WAITLIST_USER_ERRORS:
      return [];
    default:
      return state;
  }
};
