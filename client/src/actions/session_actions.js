import * as SessionApiUtil from '../util/session_api_util';
import {receiveUser, receiveUsers} from './user_actions';
import {receiveSiteTemplate} from './site_template_actions';
import {receiveWorkspaces} from './workspace_actions';
import {removeSiteTemplate} from './site_template_actions';
import {receiveUserFeature} from './user_feature_actions';
import {receiveConnections} from './connection_actions';
import {receiveSessionErrors, receiveUserErrors} from './error_actions';
import { retrieveNetworkDetails, receiveSalesNetworks, setCurrentNetwork } from './sales_network_actions';
import { receiveSalesUserNetworks } from './sales_user_network_actions'
import { receiveSalesAdminNetworks } from './sales_admin_network_actions'
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
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors));
    })
);

export const adminSignup = (formUser) => dispatch => (
  SessionApiUtil.adminSignup(formUser)
    .then(handleErrors)
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));

      dispatch(retrieveNetworkDetails(data.networkDetails))
      dispatch(receiveSalesNetworks(data.salesNetworks))
      dispatch(setCurrentNetwork(data.currentNetworkId))

      dispatch(receiveSalesUserNetworks(data.salesUserNetworks))
      dispatch(receiveSalesAdminNetworks(data.salesAdminNetworks))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors));
    })
);

export const networkInviteSignup = (formUser) => dispatch => (
  SessionApiUtil.networkInviteSignup(formUser)
    .then(handleErrors)
    .then(data => {
      localStorage.setItem('bridgekinToken', data.token);
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));

      dispatch(retrieveNetworkDetails(data.networkDetails))
      dispatch(receiveSalesNetworks(data.salesNetworks))
      dispatch(setCurrentNetwork(data.currentNetworkId))

      dispatch(receiveSalesUserNetworks(data.salesUserNetworks))
      dispatch(receiveSalesAdminNetworks(data.salesAdminNetworks))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors));
    })
);

export const googleSalesLogin = (formUser) => dispatch => (
  SessionApiUtil.googleSalesLogin(formUser)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveUsers(data.users));
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveSiteTemplate(data.siteTemplate));
      dispatch(receiveWorkspaces(data.workspaces));
      dispatch(receiveUserFeature(data.userFeature));
      localStorage.setItem('bridgekinToken', data.token);

      dispatch(retrieveNetworkDetails(data.networkDetails))
      dispatch(receiveSalesNetworks(data.salesNetworks))
      dispatch(setCurrentNetwork(data.currentNetworkId))

      dispatch(receiveSalesUserNetworks(data.salesUserNetworks))
      dispatch(receiveSalesAdminNetworks(data.salesAdminNetworks))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      // dispatch(receiveUserErrors(errors));
      dispatch(receiveSessionErrors(errors));
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

      dispatch(retrieveNetworkDetails(data.networkDetails))
      dispatch(receiveSalesNetworks(data.salesNetworks))
      dispatch(setCurrentNetwork(data.currentNetworkId))

      dispatch(receiveSalesUserNetworks(data.salesUserNetworks))
      dispatch(receiveSalesAdminNetworks(data.salesAdminNetworks))
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
