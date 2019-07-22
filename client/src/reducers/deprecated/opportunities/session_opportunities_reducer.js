import {
  RECEIVE_SESSION_OPPORTUNITY,
  REMOVE_SESSION_OPPORTUNITY} from '../../../actions/opportunity_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_SESSION_OPPORTUNITY:
      return merge({}, state, {[action.opportunity.id]: action.opportunity });
    case REMOVE_SESSION_OPPORTUNITY:
      delete newState[action.opportunityId]
      return newState;
    default:
      return state;
  }
};
