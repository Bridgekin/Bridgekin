import * as UserMetricApiUtil from '../util/user_metrics_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveUserMetricErrors } from './error_actions';
import { receiveUser } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_USER_METRICS = 'RECEIVE_USER_METRICS';

export const receiveUserMetrics = metrics => ({
  type: RECEIVE_USER_METRICS,
  metrics,
});


export const fetchCurrentUserMetrics = () => dispatch => (
  UserMetricApiUtil.fetchCurrentUserMetrics()
    .then(handleErrors)
    .then(data => dispatch(receiveUserMetrics(data.metrics)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserMetricErrors(errors))
    })
)
