import {
  RECEIVE_SAVED_OPPORTUNITIES,
  RECEIVE_SAVED_OPPORTUNITY,
  REMOVE_SAVED_OPPORTUNITY} from '../../actions/saved_opportunity_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_SAVED_OPPORTUNITIES:
      return merge({}, state, action.savedOpportunities);
    case RECEIVE_SAVED_OPPORTUNITY:
      return merge({}, state, {[action.savedOpportunity.opportunityId]: action.savedOpportunity });
    case REMOVE_SAVED_OPPORTUNITY:
      delete newState[action.savedOpportunityID]
      return newState;
    default:
      return state;
  }
};
