import {
  RECEIVE_REF_APPLICATION_ERRORS,
  CLEAR_REF_APPLICATION_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_REF_APPLICATION_ERRORS:
      return action.errors;
    case CLEAR_REF_APPLICATION_ERRORS:
      return [];
    default:
      return state;
  }
};
