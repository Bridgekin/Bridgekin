import * as MemberUsersApiUtil from '../util/member_users_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveMemberUserErrors } from './error_actions';
import { receiveUsers, receiveUser } from './user_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_MEMBER_USERS = 'RECEIVE_MEMBER_USERS';
export const RECEIVE_MEMBER_USER = 'RECEIVE_MEMBER_USER';
export const REMOVE_MEMBER_USER = "REMOVE_MEMBER_USER";

export const receiveMemberUserIds = memberUserIds => ({
  type: RECEIVE_MEMBER_USERS,
  memberUserIds,
});

export const receiveMemberUserId = memberUserId => ({
  type: RECEIVE_MEMBER_USER,
  memberUserId,
});

export const removeMemberUserId = memberUserId => ({
  type: REMOVE_MEMBER_USER,
  memberUserId
});

export const fetchMemberUsers = (networkId) => dispatch => (
  MemberUsersApiUtil.fetchMemberUsers(networkId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveMemberUserIds(data.memberUserIds))
      dispatch(receiveUsers(data.memberUsers))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveMemberUserErrors(errors))
    })
);

export const addMemberUser = (networkId, userId) => dispatch => (
  MemberUsersApiUtil.addMemberUser(networkId, userId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveMemberUserId(data.memberUser.id))
      dispatch(receiveUser(data.memberUser))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveMemberUserErrors(errors))
    })
);

export const addUserByReferral = (referralCode, userId) => dispatch => (
  MemberUsersApiUtil.addUserByReferral(referralCode, userId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveMemberUserId(data.memberUser.id))
      dispatch(receiveUser(data.memberUser))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveMemberUserErrors(errors))
    })
);

export const removeMemberUser = (networkId, userId) => dispatch => (
  MemberUsersApiUtil.removeMemberUser(networkId, userId)
    .then(handleErrors)
    .then(() => dispatch(removeMemberUserId(userId)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveMemberUserErrors(errors))
    })
);
