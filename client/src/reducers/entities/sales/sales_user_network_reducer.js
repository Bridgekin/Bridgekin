import {
  RECEIVE_SALES_USER_NETWORKS,
  RECEIVE_SALES_USER_NETWORK,
  REMOVE_SALES_USER_NETWORK
} from '../../../actions/sales_user_network_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_USER_NETWORKS:
      return merge({}, action.userNetworks);
    case RECEIVE_SALES_USER_NETWORK:
      return merge({}, state, {[action.userNetwork.id]: action.userNetwork })
    case REMOVE_SALES_USER_NETWORK:
      return {};
    default:
      return state;
  }
};
