import * as SessionApiUtil from '../util/session_api_util';
import {receiveUser, receiveUsers} from './user_actions';
import {receiveSiteTemplate} from './site_template_actions';
import {receiveWorkspaces} from './workspace_actions';
import {removeSiteTemplate} from './site_template_actions';
import {receiveUserFeature} from './user_feature_actions';
import {receiveConnections} from './connection_actions';
import {receiveSessionErrors, receiveUserErrors} from './error_actions';
import { handleErrors } from './fetch_error_handler';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

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
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));
      dispatch(receiveConnections(data.connections));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors));
    })
);

export const hireSignup = (formUser) => dispatch => (
  SessionApiUtil.hireSignup(formUser)
    .then(handleErrors)
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors));
    })
);

export const salesSignup = (formUser) => dispatch => (
  SessionApiUtil.salesSignup(formUser)
    .then(handleErrors)
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors));
    })
);

export const login = formUser => dispatch => (
  SessionApiUtil.login(formUser)
    .then(handleErrors)
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));
      dispatch(receiveConnections(data.connections));
      return data.user
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveSessionErrors(errors));
      // alert('Something went wrong. Try again in a bit, or contact us!')
    })
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then(() => {
      dispatch(logoutCurrentUser());
      dispatch(removeSiteTemplate());
    })
);
