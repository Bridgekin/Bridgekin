import {
  RECEIVE_MANAGED_NETWORKS,
  RECEIVE_MANAGED_NETWORK,
  REMOVE_MANAGED_NETWORK} from '../../actions/network_admin_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_MANAGED_NETWORKS:
      return merge({}, action.managedNetworks);
    case RECEIVE_MANAGED_NETWORK:
      return merge({}, state, {[action.managedNetwork.id]: action.managedNetwork });
    case REMOVE_MANAGED_NETWORK:
      delete newState[action.managaedNetworkID]
      return newState;
    default:
      return state;
  }
};
