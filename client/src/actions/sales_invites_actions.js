import * as SalesInviteApiUtil from '../util/sales_invite_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesInviteErrors } from './error_actions';
import { receiveUserNetwork, receiveSalesNetwork } from './sales_network_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_NETWORK_ADMIN_MAP = 'RECEIVE_NETWORK_ADMIN_MAP';
export const CLEAR_NETWORK_ADMIN_MAP = 'CLEAR_NETWORK_ADMIN_MAP';

export const retrieveNetworkAdminMap= map => ({
  type: RECEIVE_NETWORK_ADMIN_MAP,
  map,
});
export const clearNetworkAdminMap= () => ({
  type: CLEAR_NETWORK_ADMIN_MAP,
});

export const RECEIVE_SALES_INVITES = 'RECEIVE_SALES_INVITES';
export const RECEIVE_SALES_INVITE = 'RECEIVE_SALES_INVITE';
export const REMOVE_SALES_INVITE = 'REMOVE_SALES_INVITE';

export const receiveSalesInvites = invites => ({
  type: RECEIVE_SALES_INVITES,
  invites,
});
export const receiveSalesInvite = invite => ({
  type: RECEIVE_SALES_INVITE,
  invite,
});
export const removeSalesInvite = inviteId => ({
  type: REMOVE_SALES_INVITE,
  inviteId
});

export const fetchInvites = (currentDashboardTarget) => dispatch => (
  SalesInviteApiUtil.fetchInvites(currentDashboardTarget)
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveNetworkAdminMap(data.adminMap))
      dispatch(receiveUserNetwork(data.salesNetwork))
      dispatch(receiveSalesInvites(data.salesInvites))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesInviteErrors(errors))
    })
);

export const fetchInviteByCode = (code) => dispatch => (
  SalesInviteApiUtil.fetchInviteByCode(code)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveSalesInvite(data.salesInvite))
      dispatch(receiveSalesNetwork(data.salesNetwork))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesInviteErrors(errors))
    })
);

export const createInvites = (payload) => dispatch => (
  SalesInviteApiUtil.createInvites(payload)
    .then(handleErrors)
    .then(data => dispatch(receiveSalesInvites(data.salesInvites)))
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesInviteErrors(errors))
    })
);

export const updateInvite = (payload) => dispatch => (
  SalesInviteApiUtil.updateInvite(payload)
    .then(handleErrors)
    .then(data => dispatch(receiveSalesInvite(data.salesInvite)))
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesInviteErrors(errors))
    })
);

export const deleteInvite = (inviteId) => dispatch => (
  SalesInviteApiUtil.deleteInvite(inviteId)
    .then(handleErrors)
    .then(data => dispatch(removeSalesInvite(inviteId)))
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesInviteErrors(errors))
    })
);
