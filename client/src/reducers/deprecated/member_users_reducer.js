import {
  RECEIVE_MEMBER_USERS,
  RECEIVE_MEMBER_USER,
  REMOVE_MEMBER_USER} from '../../actions/member_users_actions';
// import merge from 'lodash/merge';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_MEMBER_USERS:
      return new Set([...action.memberUserIds])
    case RECEIVE_MEMBER_USER:
      return new Set([...state, action.memberUserId])
    case REMOVE_MEMBER_USER:
      let newState = new Set([...state]);
      newState.delete(action.memberUserId)
      return newState;
    default:
      return state;
  }
};
