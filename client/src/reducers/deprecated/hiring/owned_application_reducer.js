import {
  RECEIVE_OWNED_APPLICATIONS } from '../../../actions/ref_application_actions';
import merge from 'lodash/merge';

export default(state = [], action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_OWNED_APPLICATIONS:
      return merge([], action.ownedApps);
    default:
      return state;
  }
};
