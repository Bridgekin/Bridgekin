import {
  RECEIVE_USER_OPPORTUNITIES,
  RECEIVE_USER_OPPORTUNITY,
  REMOVE_USER_OPPORTUNITY} from '../../actions/user_opportunity_actions';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_USER_OPPORTUNITIES:
      return new Set([...action.userOpportunityIds])
    case RECEIVE_USER_OPPORTUNITY:
      return new Set([...state, action.userOpportunityId])
    case REMOVE_USER_OPPORTUNITY:
      let newState = new Set([...state]);
      newState.delete(action.userOpportunityId)
      return newState;
    default:
      return state;
  }
};
