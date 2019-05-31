import {
  RECEIVE_REF_APPLICATIONS,
  RECEIVE_REF_APPLICATION,
  REMOVE_REF_APPLICATION} from '../../../actions/ref_application_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_REF_APPLICATIONS:
      return merge({}, state, action.refApplications);
    case RECEIVE_REF_APPLICATION:
      return merge({}, state, {[action.refApplication.id]: action.refApplication });
    case REMOVE_REF_APPLICATION:
      delete newState[action.refApplicationId]
      return newState;
    default:
      return state;
  }
};
