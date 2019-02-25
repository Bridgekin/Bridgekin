import {
  RECEIVE_USERS,
  RECEIVE_USER,
  REMOVE_USER} from '../../actions/user_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_USER:
      return merge({}, state, {[action.user.id]: action.user });
    case REMOVE_USER:
      delete newState[action.userId]
      return newState;
    default:
      return state;
  }
};
