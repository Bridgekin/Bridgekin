import {
  RECEIVE_CIRCLES,
  RECEIVE_CIRCLE,
  REMOVE_CIRCLE} from '../../actions/circle_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CIRCLES:
      return merge({}, state, action.circles);
    case RECEIVE_CIRCLE:
      return merge({}, state, {[action.circle.id]: action.circle });
    case REMOVE_CIRCLE:
      delete newState[action.circleId]
      return newState;
    default:
      return state;
  }
};
