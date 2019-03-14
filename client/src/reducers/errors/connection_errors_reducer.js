import {
  RECEIVE_CONNECTION_ERRORS,
  CLEAR_CONNECTION_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_CONNECTION_ERRORS:
      return action.errors;
    case CLEAR_CONNECTION_ERRORS:
      return [];
    default:
      return state;
  }
};
