import {
  RECEIVE_FACILITATED_OPPORTUNITIES,
  RECEIVE_FACILITATED_OPPORTUNITY,
  REMOVE_FACILITATED_OPPORTUNITY} from '../../actions/facilitated_opportunity_actions';
// import merge from 'lodash/merge';

export default(state = new Set(), action) => {
  Object.freeze(state);
  // let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_FACILITATED_OPPORTUNITIES:
      return new Set([...action.facilitatedOppIds])
    case RECEIVE_FACILITATED_OPPORTUNITY:
      return new Set([...state, action.facilitatedOppId])
    case REMOVE_FACILITATED_OPPORTUNITY:
      let newState = new Set([...state]);
      newState.delete(action.facilitatedOppId)
      return newState;
    default:
      return state;
  }
};
