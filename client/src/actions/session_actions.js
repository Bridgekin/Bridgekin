import * as SessionApiUtil from '../util/session_api_util';
import {receiveUser} from './user_actions';
import {receiveSessionErrors} from './error_actions';
import { handleErrors } from './fetch_error_handler';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const refSignup = (formUser, code) => dispatch => (
  SessionApiUtil.refSignup(formUser, code)
    .then(handleErrors)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = ['Something went wrong. Try again in a bit, or contact us!'];
      }
      dispatch(receiveSessionErrors(errors));
    })
);

export const login = formUser => dispatch => (
  SessionApiUtil.login(formUser)
    .then(handleErrors)
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUser(data.user));
      dispatch(receiveCurrentUser(data.user));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = ['Something went wrong. Try again in a bit, or contact us!'];
      }
      dispatch(receiveSessionErrors(errors));
      // alert('Something went wrong. Try again in a bit, or contact us!')
    })
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then(() => {
      localStorage.removeItem('bridgekinToken');
      dispatch(logoutCurrentUser());
    })
);
