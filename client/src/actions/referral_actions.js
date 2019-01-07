import * as ReferralApiUtil from '../util/referrals_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveReferralErrors } from './error_actions';

export const RECEIVE_REFERRAL = 'RECEIVE_REFERRAL';
export const REMOVE_REFERRAL = "REMOVE_REFERRAL";

export const receiveReferral = referral => ({
  type: RECEIVE_REFERRAL,
  referral,
});

export const removeReferral = () => ({
  type: REMOVE_REFERRAL,
});

export const createReferral = (referral) => dispatch => (
  ReferralApiUtil.createReferral(referral)
    .then(handleErrors)
    .then(data => dispatch(receiveReferral(data)))
    .catch(errors => dispatch(receiveReferralErrors(errors)))
);
