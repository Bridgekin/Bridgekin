import {
  RECEIVE_CIRCLE_CONNECTIONS,
  RECEIVE_CIRCLE_CONNECTION,
  REMOVE_CIRCLE_CONNECTION} from '../../../actions/circle_connection_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CIRCLE_CONNECTIONS:
      return merge({}, state, action.circleConnections);
    case RECEIVE_CIRCLE_CONNECTION:
      return merge({}, state, {[action.circleConnection.id]: action.circleConnection });
    case REMOVE_CIRCLE_CONNECTION:
      delete newState[action.circleConnectionId]
      return newState;
    default:
      return state;
  }
};
