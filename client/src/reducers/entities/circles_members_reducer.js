import {
  RECEIVE_CIRCLE_MEMBER_SETS,
  RECEIVE_CIRCLE_MEMBER_SET,
  REMOVE_CIRCLE_MEMBER_SET} from '../../actions/circle_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CIRCLE_MEMBER_SETS:
      return merge({}, action.circleMemberSets);
    case RECEIVE_CIRCLE_MEMBER_SET:
      return Object.assign({}, state, {[action.circleId]: action.circleMembers})
    case REMOVE_CIRCLE_MEMBER_SET:
      delete newState[action.circleId]
      return newState;
    default:
      return state;
  }
};
