import {
  RECEIVE_SALES_USER_PERMISSIONS,
  RECEIVE_SALES_USER_PERMISSION,
  REMOVE_SALES_USER_PERMISSION
} from '../../../actions/sales_user_permission_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_USER_PERMISSIONS:
      return merge({}, action.userPermissions);
    case RECEIVE_SALES_USER_PERMISSION:
      return merge({}, state, {[action.userPermission.id]: action.userPermission })
    case REMOVE_SALES_USER_PERMISSION:
      return {};
    default:
      return state;
  }
};
