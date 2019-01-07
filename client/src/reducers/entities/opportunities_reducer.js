import {
  RECEIVE_OPPORTUNITIES,
  RECEIVE_OPPORTUNITY,
  REMOVE_OPPORTUNITY} from '../../actions/opportunity_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_OPPORTUNITIES:
      return merge({}, action.opportunities);
    case RECEIVE_OPPORTUNITY:
      return merge({}, state, {[action.opportunity.id]: action.opportunity });
    case REMOVE_OPPORTUNITY:
      delete newState[action.opportunityId]
      return newState;
    default:
      return state;
  }
};
