import {
  RECEIVE_SUBMITTED_APPLICATIONS,
  RECEIVE_SUBMITTED_APPLICATION, } from '../../../actions/ref_application_actions';
import merge from 'lodash/merge';

export default(state = [], action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_SUBMITTED_APPLICATIONS:
      return merge([], action.submittedApps);
    case RECEIVE_SUBMITTED_APPLICATION:
      return merge([], state, {[action.submittedApp.id]: action.submittedApp });
    default:
      return state;
  }
};
