import {
  // RESET_NETWORKS,
  RECEIVE_NETWORKS,
  RECEIVE_NETWORK,
  REMOVE_NETWORK} from '../../actions/network_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    // case RESET_NETWORKS:
    //   return merge({}, action.networks);
    case RECEIVE_NETWORKS:
      return merge({}, action.networks);
    case RECEIVE_NETWORK:
      return merge({}, state, {[action.network.id]: action.network });
    case REMOVE_NETWORK:
      delete newState[action.networkId]
      return newState;
    default:
      return state;
  }
};
