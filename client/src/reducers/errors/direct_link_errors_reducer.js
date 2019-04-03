import {
  RECEIVE_DIRECT_LINK_ERRORS,
  CLEAR_DIRECT_LINK_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_DIRECT_LINK_ERRORS:
      return action.errors;
    case CLEAR_DIRECT_LINK_ERRORS:
      return [];
    default:
      return state;
  }
};
