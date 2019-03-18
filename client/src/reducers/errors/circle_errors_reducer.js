import {
  RECEIVE_CIRCLE_ERRORS,
  CLEAR_CIRCLE_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_CIRCLE_ERRORS:
      return action.errors;
    case CLEAR_CIRCLE_ERRORS:
      return [];
    default:
      return state;
  }
};
