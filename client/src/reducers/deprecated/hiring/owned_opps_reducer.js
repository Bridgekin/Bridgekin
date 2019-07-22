import {
  RECEIVE_OWNED_REF_OPPS,
  RECEIVE_OWNED_REF_OPP } from '../../../actions/ref_opportunity_actions';
import merge from 'lodash/merge';

export default(state = [], action) => {
  Object.freeze(state);
  let newState = merge([], state);

  switch(action.type){
    case RECEIVE_OWNED_REF_OPPS:
      return merge([], action.ownedRefOpps);
    case RECEIVE_OWNED_REF_OPP:
      return newState.push(action.ownedRefOppId)
    // case REMOVE_REF_OPP:
    //   delete newState[action.refOppId]
    //   return newState;
    default:
      return state;
  }
};
