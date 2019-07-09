import {
  RECEIVE_USER_SALES_NETWORKS,
  RECEIVE_USER_SALES_NETWORK,
  REMOVE_USER_SALES_NETWORK
} from '../../../actions/sales_network_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_USER_SALES_NETWORKS:
      return merge({}, action.networks);
    case RECEIVE_USER_SALES_NETWORK:
      return merge({}, state, {[action.network.id]: action.network })
    case REMOVE_USER_SALES_NETWORK:
      return {};
    default:
      return state;
  }
};
