import * as UtilApiUtil from '../util/util_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveUtilErrors } from './error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_DIMENSIONS = 'RECEIVE_DIMENSIONS';
export const receiveDimensions = (width, height) => ({
  type: RECEIVE_DIMENSIONS,
  height, width
});

export const CONSUME_TUTORIAL_SESSION = 'CONSUME_TUTORIAL_SESSION';
export const consumeTutorialSession = () => ({
  type: CONSUME_TUTORIAL_SESSION
})

export const requestDemo = (payload) => dispatch => (
  UtilApiUtil.requestDemo(payload)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveUtilErrors(errors))
    })
)