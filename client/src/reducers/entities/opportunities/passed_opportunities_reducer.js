import {
  RECEIVE_PASSED_OPPORTUNITIES,
  RECEIVE_PASSED_OPPORTUNITY,
  REMOVE_PASSED_OPPORTUNITY} from '../../../actions/passed_opportunity_actions';

  export default(state = new Set(), action) => {
    Object.freeze(state);

  switch(action.type){
    case RECEIVE_PASSED_OPPORTUNITIES:
      return new Set([...action.opportunityIds])
    case RECEIVE_PASSED_OPPORTUNITY:
      return new Set([...state, action.opportunityId])
    case REMOVE_PASSED_OPPORTUNITY:
      let newState = new Set([...state]);
      newState.delete(action.opportunityId)
      return newState;
    default:
      return state;
  }
};
