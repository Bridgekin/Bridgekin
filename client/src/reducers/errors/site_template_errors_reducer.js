import {
  RECEIVE_SITE_TEMPLATE_ERRORS,
  CLEAR_SITE_TEMPLATE_ERRORS } from '../../actions/error_actions';
import merge from 'lodash/merge';

export default (state = [] , action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_SITE_TEMPLATE_ERRORS:
      return action.errors;
    case CLEAR_SITE_TEMPLATE_ERRORS:
      return [];
    default:
      return state;
  }
};
