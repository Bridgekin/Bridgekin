import * as SalesNetworkInviteApiUtil from '../util/sales_network_invite_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesNetworkInviteErrors } from './error_actions';
import { receiveUserNetwork } from './sales_network_actions';

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

export const RECEIVE_SALES_NETWORK_INVITES = 'RECEIVE_SALES_NETWORK_INVITES';
export const RECEIVE_SALES_NETWORK_INVITE = 'RECEIVE_SALES_NETWORK_INVITE';
export const REMOVE_SALES_NETWORK_INVITE = 'REMOVE_SALES_NETWORK_INVITE';

export const receiveSalesNetworkInvites = networkInvites => ({
  type: RECEIVE_SALES_NETWORK_INVITES,
  networkInvites,
});
export const receiveSalesNetworkInvite = networkInvite => ({
  type: RECEIVE_SALES_NETWORK_INVITE,
  networkInvite,
});
export const removeSalesNetworkInvite = networkInviteId => ({
  type: REMOVE_SALES_NETWORK_INVITE,
  networkInviteId
});

export const fetchNetworkInvites = (networkId) => dispatch => (
  SalesNetworkInviteApiUtil.fetchAdminSignupLink(networkId)
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveNetworkAdminMap(data.adminMap))
      dispatch(receiveUserNetwork(data.salesNetwork))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesNetworkInviteErrors(errors))
    })
);
