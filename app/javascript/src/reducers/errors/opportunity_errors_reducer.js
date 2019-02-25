import {
  RECEIVE_OPPORTUNITY_ERRORS,
  CLEAR_OPPORTUNITY_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_OPPORTUNITY_ERRORS:
      return action.errors;
    case CLEAR_OPPORTUNITY_ERRORS:
      return [];
    default:
      return state;
  }
};
