import {
  RECEIVE_USER_FEATURE,
  UPDATE_TUTORIAL_STEP,
  UPDATE_TUTORIAL_TEMP} from '../../../actions/user_feature_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_USER_FEATURE:
      return merge({}, action.userFeature);
    case UPDATE_TUTORIAL_STEP:
      newState.tutorialTourStep = action.stepCount
      return newState;
    default:
      return state;
  }
};
