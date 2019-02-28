import {
  RECEIVE_SHARE_OPTIONS } from '../../actions/opp_permission_actions';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_SHARE_OPTIONS:
      return new Set([...action.shareOptions])
    default:
      return state;
  }
};
