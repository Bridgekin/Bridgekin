import {
  RECEIVE_SALES_INTRO_ERRORS,
  CLEAR_SALES_INTRO_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_SALES_INTRO_ERRORS:
      return action.errors;
    case CLEAR_SALES_INTRO_ERRORS:
      return [];
    default:
      return state;
  }
};
