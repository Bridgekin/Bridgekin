import {
  RECEIVE_SALES_NETWORK_INVITES,
  RECEIVE_SALES_NETWORK_INVITE,
  REMOVE_SALES_NETWORK_INVITE
} from '../../../actions/sales_network_invites_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_NETWORK_INVITES:
      return merge({}, state, action.networkInvites);
    case RECEIVE_SALES_NETWORK_INVITE:
      return merge({}, state, { [action.networkInvite.id]: action.networkInvite });
    case REMOVE_SALES_NETWORK_INVITE:
      delete newState[action.networkInviteId]
      return newState;
    default:
      return state;
  }
};
