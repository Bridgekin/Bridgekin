import {
  RECEIVE_SALES_ADMIN_NETWORKS,
  RECEIVE_SALES_ADMIN_NETWORK,
  REMOVE_SALES_ADMIN_NETWORK
} from '../../../actions/sales_admin_network_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_ADMIN_NETWORKS:
      return merge({}, action.adminNetworks);
    case RECEIVE_SALES_ADMIN_NETWORK:
      return merge({}, state, {[action.adminNetwork.id]: action.adminNetwork })
    case REMOVE_SALES_ADMIN_NETWORK:
      return {};
    default:
      return state;
  }
};
