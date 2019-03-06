import {
  RECEIVE_WORKSPACE_OPTIONS,
  RECEIVE_WORKSPACE_OPTION,
  REMOVE_WORKSPACE_OPTION} from '../../actions/workspace_actions';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_WORKSPACE_OPTIONS:
      return new Set([...action.workspaceOptionIds])
    case RECEIVE_WORKSPACE_OPTION:
      return new Set([...state, action.workspaceOptionId])
    case REMOVE_WORKSPACE_OPTION:
      let newState = new Set([...state]);
      newState.delete(action.workspaceOptionId)
      return newState;
    default:
      return state;
  }
};
