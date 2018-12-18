import * as WaitlistApiUtil from '../util/waitlist_api_util';

export const registerWaitlist = formUser => dispatch =>
  WaitlistApiUtil.joinWaitlist(formUser)
    .then(user => 'Registered User on Waitlist',
      (errors) => errors.responseJSON);
