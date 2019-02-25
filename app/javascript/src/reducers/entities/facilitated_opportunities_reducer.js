import {
  RECEIVE_FACILITATED_OPPORTUNITIES,
  RECEIVE_FACILITATED_OPPORTUNITY,
  REMOVE_FACILITATED_OPPORTUNITY} from '../../actions/facilitated_opportunity_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_FACILITATED_OPPORTUNITIES:
      return merge({}, action.opportunities);
    case RECEIVE_FACILITATED_OPPORTUNITY:
      return merge({}, state, {[action.opportunity.id]: action.opportunity });
    case REMOVE_FACILITATED_OPPORTUNITY:
      delete newState[action.opportunityId]
      return newState;
    default:
      return state;
  }
};
