import {
  RECEIVE_NETWORK_OPPS,
  RECEIVE_NETWORK_OPP,
  REMOVE_NETWORK_OPP} from '../../actions/network_opp_actions';

export default(state = new Set(), action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_NETWORK_OPPS:
      return new Set([...action.networkOppIds])
    case RECEIVE_NETWORK_OPP:
      return new Set([...state, action.networkOppId])
    case REMOVE_NETWORK_OPP:
      let newState = new Set([...state]);
      newState.delete(action.networkOppId)
      return newState;
    default:
      return state;
  }
};
