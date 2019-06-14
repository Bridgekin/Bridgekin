import {
  RECEIVE_REQUEST_INTRO_ERRORS,
  CLEAR_REQUEST_INTRO_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_REQUEST_INTRO_ERRORS:
      return action.errors;
    case CLEAR_REQUEST_INTRO_ERRORS:
      return [];
    default:
      return state;
  }
};
