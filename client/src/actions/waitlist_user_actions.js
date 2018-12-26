import * as WaitlistApiUtil from '../util/waitlist_api_util';
import { handleErrors } from './fetch_error_handler';

export const registerWaitlistUser = formUser => dispatch =>
  WaitlistApiUtil.joinWaitlist(formUser)
    .then(handleErrors)
    .then(res => {
      debugger
      return {type:'ok', msg:'Registered User on Waitlist'}
    })
    .catch(errors => {
      debugger
      return {type:'bad', msg:"Couldn't create waitlist user"}
    })
