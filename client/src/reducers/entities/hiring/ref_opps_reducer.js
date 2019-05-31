import {
  RECEIVE_REF_OPPS,
  RECEIVE_REF_OPP,
  REMOVE_REF_OPP} from '../../../actions/ref_opportunity_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_REF_OPPS:
      return merge({}, state, action.refOpps);
    case RECEIVE_REF_OPP:
      return merge({}, state, {[action.refOpp.id]: action.refOpp });
    case REMOVE_REF_OPP:
      delete newState[action.refOppId]
      return newState;
    default:
      return state;
  }
};
