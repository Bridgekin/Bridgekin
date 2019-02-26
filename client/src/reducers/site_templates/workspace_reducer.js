import {
  RECEIVE_WORKSPACES,
  REMOVE_WORKSPACE
} from '../../actions/workspace_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  // let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_WORKSPACES:
      return merge({}, action.workspaces);
    case REMOVE_WORKSPACE:
      return {};
    default:
      return state;
  }
};
