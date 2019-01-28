import * as UserApiUtil from '../util/user_api_util';
import { receiveUserErrors } from './error_actions';
import { handleErrors } from './fetch_error_handler';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = "REMOVE_USER";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

export const updateUser = (user) => dispatch => (
  UserApiUtil.updateUser(user)
    .then(handleErrors)
    .then(data => dispatch(receiveUser(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const deleteUser = (id) => dispatch => (
  UserApiUtil.deleteUser(id)
    .then(handleErrors)
    .then(() => dispatch(removeUser(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const resetPassword = (email) => dispatch => (
  UserApiUtil.resetPassword(email)
    .then(handleErrors)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const passwordUpdate = (payload) => dispatch => (
  UserApiUtil.passwordUpdate(payload)
    .then(handleErrors)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);
