import {
  RECEIVE_SALES_INVITES,
  RECEIVE_SALES_INVITE,
  REMOVE_SALES_INVITE
} from '../../../actions/sales_invites_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_INVITES:
      return merge({}, state, action.invites);
    case RECEIVE_SALES_INVITE:
      return merge({}, state, { [action.invite.id]: action.invite });
    case REMOVE_SALES_INVITE:
      delete newState[action.inviteId]
      return newState;
    default:
      return state;
  }
};
