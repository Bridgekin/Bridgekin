import {
  RECEIVE_CONNECTED_OPPORTUNITIES,
  RECEIVE_CONNECTED_OPPORTUNITY,
  REMOVE_CONNECTED_OPPORTUNITY} from '../../actions/connected_opportunity_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CONNECTED_OPPORTUNITIES:
      return merge({}, action.opportunities);
    case RECEIVE_CONNECTED_OPPORTUNITY:
      return merge({}, state, {[action.opportunity.id]: action.opportunity });
    case REMOVE_CONNECTED_OPPORTUNITY:
      delete newState[action.opportunityId]
      return newState;
    default:
      return state;
  }
};
