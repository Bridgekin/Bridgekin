import * as WaitlistApiUtil from '../util/waitlist_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveWaitlistUserErrors } from './error_actions';

export const registerWaitlistUser = formUser => dispatch =>
  WaitlistApiUtil.joinWaitlist(formUser)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = ['Something went wrong. Try again in a bit, or contact us!'];
      }
      dispatch(receiveWaitlistUserErrors(errors))
    })
