import {
  RECEIVE_CONNECTIONS,
  RECEIVE_CONNECTION,
  REMOVE_CONNECTION} from '../../actions/connection_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CONNECTIONS:
      return merge({}, state, action.connections);
    case RECEIVE_CONNECTION:
      return merge({}, state, {[action.connection.id]: action.connection });
    case REMOVE_CONNECTION:
      delete newState[action.connectionId]
      return newState;
    default:
      return state;
  }
};
