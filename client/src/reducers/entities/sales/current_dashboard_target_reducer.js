import {
  SET_CURRENT_DASHBOARD_TARGET } from '../../../actions/sales_network_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case SET_CURRENT_DASHBOARD_TARGET:
      return merge({}, action.target)
    default:
      return state;
  }
};
