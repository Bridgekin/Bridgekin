import {
  RECEIVE_REFERRAL,
  REMOVE_REFERRAL} from '../../actions/referral_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_REFERRAL:
      return merge({}, action.referral);
    case REMOVE_REFERRAL:
      delete newState[action.referralId]
      return newState;
    default:
      return state;
  }
};
