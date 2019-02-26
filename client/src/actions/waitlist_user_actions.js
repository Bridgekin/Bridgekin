import * as WaitlistApiUtil from '../util/waitlist_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveWaitlistUserErrors } from './error_actions';
import { receiveUser } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const registerWaitlistUser = formUser => dispatch => (
  WaitlistApiUtil.joinWaitlist(formUser)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveWaitlistUserErrors(errors))
    })
)

export const registerWaitlistFromReferral = formUser => dispatch => (
  WaitlistApiUtil.registerWaitlistFromReferral(formUser)
    .then(handleErrors)
    .then(data => dispatch(receiveUser(data.user)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveWaitlistUserErrors(errors))
    })
)
