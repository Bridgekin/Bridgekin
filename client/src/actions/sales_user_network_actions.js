// import * as SalesNetworkInviteApiUtil from '../util/sales_network_invite_api_util';
import { handleErrors } from './fetch_error_handler';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SALES_USER_NETWORKS = 'RECEIVE_SALES_USER_NETWORKS';
export const RECEIVE_SALES_USER_NETWORK = 'RECEIVE_SALES_USER_NETWORK';
export const REMOVE_SALES_USER_NETWORK = 'REMOVE_SALES_USER_NETWORK';

export const receiveSalesUserNetworks = userNetworks => ({
  type: RECEIVE_SALES_USER_NETWORKS,
  userNetworks,
});
export const receiveSalesUserNetwork = userNetwork => ({
  type: RECEIVE_SALES_USER_NETWORK,
  userNetwork,
});
export const removeSalesUserNetwork = userNetworkId => ({
  type: REMOVE_SALES_USER_NETWORK,
  userNetworkId
});