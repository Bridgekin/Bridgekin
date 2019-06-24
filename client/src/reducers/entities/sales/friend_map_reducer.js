import {
  RECEIVE_FRIEND_MAP,
  CLEAR_FRIEND_MAP
} from '../../../actions/sales_contacts_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FRIEND_MAP:
      return merge({}, action.friendMap)
    case CLEAR_FRIEND_MAP:
      return {}
    default:
      return state;
  }
};
