import {
  RECEIVE_NETWORK_ADMIN_MAP,
  CLEAR_NETWORK_ADMIN_MAP
} from '../../../actions/sales_invites_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_NETWORK_ADMIN_MAP:
      return merge({}, action.map);
    case CLEAR_NETWORK_ADMIN_MAP:
      return {};
    default:
      return state;
  }
};
