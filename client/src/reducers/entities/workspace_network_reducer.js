import {
  RECEIVE_WORKSPACE_NETWORKS,
  RECEIVE_WORKSPACE_NETWORK,
  REMOVE_WORKSPACE_NETWORK} from '../../actions/workspace_network_actions';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_WORKSPACE_NETWORKS:
      return new Set([...action.workspaceNetworkIds])
    case RECEIVE_WORKSPACE_NETWORK:
      return new Set([...state, action.workspaceNetworkId])
    case REMOVE_WORKSPACE_NETWORK:
      let newState = new Set([...state]);
      newState.delete(action.workspaceNetworkId)
      return newState;
    default:
      return state;
  }
};
