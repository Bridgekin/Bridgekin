import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import merge from 'lodash/merge';

const _nullSession = {
  id: null,
};

export default(state = _nullSession, action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return merge({}, {id: action.user.id });
    case LOGOUT_CURRENT_USER:
      localStorage.removeItem('bridgekinToken');
      return _nullSession;
    default:
      return state;
  }
};
