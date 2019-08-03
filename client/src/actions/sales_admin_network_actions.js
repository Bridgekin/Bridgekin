// import * as SalesInviteApiUtil from '../util/sales_invite_api_util';
import { handleErrors } from './fetch_error_handler';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SALES_ADMIN_NETWORKS = 'RECEIVE_SALES_ADMIN_NETWORKS';
export const RECEIVE_SALES_ADMIN_NETWORK = 'RECEIVE_SALES_ADMIN_NETWORK';
export const REMOVE_SALES_ADMIN_NETWORK = 'REMOVE_SALES_ADMIN_NETWORK';

export const receiveSalesAdminNetworks = adminNetworks => ({
  type: RECEIVE_SALES_ADMIN_NETWORKS,
  adminNetworks,
});
export const receiveSalesAdminNetwork = adminNetwork => ({
  type: RECEIVE_SALES_ADMIN_NETWORK,
  adminNetwork,
});
export const removeSalesAdminNetwork = adminNetworkId => ({
  type: REMOVE_SALES_ADMIN_NETWORK,
  adminNetworkId
});