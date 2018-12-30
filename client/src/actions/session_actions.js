import * as SessionApiUtil from '../util/session_api_util';
import {receiveUser} from './user_actions';
import {receiveSessionErrors, clearSessionErrors} from './error_actions';
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

export const signup = formUser => dispatch => (
  SessionApiUtil.signup(formUser)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveUser(data.user));
      dispatch(receiveCurrentUser(data.user));
    })
    .catch(errors => dispatch(receiveSessionErrors(errors.errors[0])))
);

export const login = formUser => dispatch => (
  SessionApiUtil.login(formUser)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveUser(data.user));
      dispatch(receiveCurrentUser(data.user));
      localStorage.setItem('bridgekinToken', data.token);
    })
    .catch(errors => {
      debugger
      if (errors instanceof Error){
        dispatch(receiveSessionErrors('Email or password is invalid'));
        alert('Email or password is invalid');
      } else {
        let msg = errors.errors[0];
        dispatch(receiveSessionErrors(msg))
        alert(msg);
      }
    })
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then(() => {
      dispatch(logoutCurrentUser());
      localStorage.removeItem('bridgekinToken');
    })
    .catch(errors => dispatch(receiveSessionErrors(errors.errors[0])))
);
