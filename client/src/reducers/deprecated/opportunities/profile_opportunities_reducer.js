import {
  RECEIVE_PROFILE_OPPORTUNITIES,
  // RECEIVE_PROFILE_OPPORTUNITY,
  REMOVE_PROFILE_OPPORTUNITIES} from '../../../actions/profile_opportunity_actions';

export default(state = [], action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_PROFILE_OPPORTUNITIES:
      return [...action.profileOpportunityIds]
    case REMOVE_PROFILE_OPPORTUNITIES:
      return [];
    default:
      return state;
  }
};
