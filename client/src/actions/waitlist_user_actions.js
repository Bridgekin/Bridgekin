import * as WaitlistApiUtil from '../util/waitlist_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveWaitlistUserErrors,
         clearWaitlistUserErrors } from './error_actions';

export const registerWaitlistUser = formUser => dispatch =>
  WaitlistApiUtil.joinWaitlist(formUser)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if(errors instanceof Array){
        dispatch(receiveWaitlistUserErrors(errors))
      } else {
        let catchAllError = [
          "Something went wrong on our end. Try again in a few minutes"
        ];
        dispatch(receiveWaitlistUserErrors(catchAllError))
      }
    })
