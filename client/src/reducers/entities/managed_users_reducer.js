import {
  RECEIVE_MANAGED_USERS,
  RECEIVE_MANAGED_USER,
  REMOVE_MANAGED_USER} from '../../actions/network_admin_actions';
import merge from 'lodash/merge';

export default(state = new Set(), action) => {
  Object.freeze(state);
  // let newState = merge([], state);

  switch(action.type){
    case RECEIVE_MANAGED_USERS:
      return merge(new Set(), action.managedUserId);
    case RECEIVE_MANAGED_USER:
      return merge(new Set(), state, action.managedUserId);
    case REMOVE_MANAGED_USER:
      delete newState[action.managaedNetworkID]
      return newState;
    default:
      return state;
  }
};
