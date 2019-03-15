import {
  RECEIVE_CIRCLE_MEMBERS,
  REMOVE_CIRCLE_MEMBERS} from '../../actions/circle_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CIRCLE_MEMBERS:
      return merge({}, state, action.circleMembers);
    case REMOVE_CIRCLE_MEMBERS:
      delete newState[action.circleId]
      return newState;
    default:
      return state;
  }
};
