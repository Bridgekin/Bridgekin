import {
  RECEIVE_OPP_PERMISSIONS,
  RECEIVE_OPP_PERMISSION,
  REMOVE_OPP_PERMISSION} from '../../actions/opp_permission_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_OPP_PERMISSIONS:
      return merge({}, state, action.oppPermissions);
    case RECEIVE_OPP_PERMISSION:
      return merge({}, state, {[action.oppPermission.id]: action.oppPermission });
    case REMOVE_OPP_PERMISSION:
      delete newState[action.oppPermissionId]
      return newState;
    default:
      return state;
  }
};
