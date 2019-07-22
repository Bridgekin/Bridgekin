import {
  RECEIVE_CONNECTED_OPPORTUNITIES,
  RECEIVE_CONNECTED_OPPORTUNITY,
  REMOVE_CONNECTED_OPPORTUNITY} from '../../actions/connected_opportunity_actions';
// import merge from 'lodash/merge';

export default(state = new Set(), action) => {
  Object.freeze(state);
  // let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_CONNECTED_OPPORTUNITIES:
      return new Set([...action.connectedOppIds])
    case RECEIVE_CONNECTED_OPPORTUNITY:
      return new Set([...state, action.connectedOppId])
    case REMOVE_CONNECTED_OPPORTUNITY:
      let newState = new Set([...state]);
      newState.delete(action.connectedOppId)
      return newState;
    default:
      return state;
  }
};
