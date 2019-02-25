import {
  RECEIVE_MEMBER_USERS,
  RECEIVE_MEMBER_USER,
  REMOVE_MEMBER_USER} from '../../actions/member_users_actions';
// import merge from 'lodash/merge';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_MEMBER_USERS:
      return new Set([...state, ...action.memberUserIds])
      // return newState.add(action.memberUserIds)
      // return merge(new Set(), action.memberUserIds);
    case RECEIVE_MEMBER_USER:
      return new Set([...state, action.memberUserId])
      // return merge(new Set(), state, action.memberUserId);
    case REMOVE_MEMBER_USER:
      let newState = new Set(state);
      newState.delete(action.memberNetworkId)
      // delete newState[action.managaedNetworkID]
      return newState;
    default:
      return state;
  }
};
