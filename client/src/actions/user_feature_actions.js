import * as UserFeatureApiUtil from '../util/user_feature_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveUserFeatureErrors } from './error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_USER_FEATURE = 'RECEIVE_USER_FEATURE';
export const UPDATE_TUTORIAL_STEP = 'UPDATE_TUTORIAL_STEP';

export const receiveUserFeature = userFeature => ({
  type: RECEIVE_USER_FEATURE,
  userFeature
});

export const updateTutorialStep = stepCount => ({
  type: UPDATE_TUTORIAL_STEP,
  stepCount
});

export const updateUserFeature = (payload) => dispatch => (
  UserFeatureApiUtil.updateUserFeature(payload)
    .then(handleErrors)
    .then(data => dispatch(receiveUserFeature(data.userFeature)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserFeatureErrors(errors))
    })
)
