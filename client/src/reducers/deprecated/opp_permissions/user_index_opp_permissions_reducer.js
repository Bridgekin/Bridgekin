import {
  RECEIVE_USER_OPP_PERMISSIONS,
  RECEIVE_USER_OPP_PERMISSION,
  REMOVE_USER_OPP_PERMISSION} from '../../../actions/opp_permission_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_USER_OPP_PERMISSIONS:
      return merge({}, action.oppPerms);
    case RECEIVE_USER_OPP_PERMISSION:
      return merge({}, state, {[action.oppPerm.id]: action.oppPerm });
    case REMOVE_USER_OPP_PERMISSION:
      delete newState[action.connectionId]
      return newState;
    default:
      return state;
  }
};
