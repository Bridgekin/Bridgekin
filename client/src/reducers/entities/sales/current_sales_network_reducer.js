import {
  SET_CURRENT_SALES_NETWORK } from '../../../actions/sales_network_actions';
import merge from 'lodash/merge';

export default (state = null, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case SET_CURRENT_SALES_NETWORK:
      return action.networkId
    default:
      return state;
  }
};
