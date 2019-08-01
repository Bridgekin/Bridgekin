import * as SalesApiUtil from '../util/sales_network_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesNetworkErrors } from './error_actions';
import { receiveSalesUserPermissions } from './sales_user_permission_actions'
import { receiveSalesAdminNetworks } from './sales_admin_network_actions'

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SEARCH_NETWORKS = 'RECEIVE_SEARCH_NETWORKS';
export const CLEAR_SEARCH_NETWORKS = 'CLEAR_SEARCH_NETWORKS';
export const RECEIVE_USER_SALES_NETWORKS = 'RECEIVE_USER_SALES_NETWORKS';
export const RECEIVE_USER_SALES_NETWORK = 'RECEIVE_USER_SALES_NETWORK';
export const REMOVE_USER_SALES_NETWORK = "REMOVE_USER_SALES_NETWORK";
export const RECEIVE_SALES_NETWORK_DETAILS = 'RECEIVE_SALES_NETWORK_DETAILS';
export const CLEAR_SALES_NETWORK_DETAILS = 'CLEAR_SALES_NETWORK_DETAILS';

export const SET_CURRENT_DASHBOARD_TARGET = 'SET_CURRENT_DASHBOARD_TARGET';

export const RECEIVE_SALES_NETWORKS = 'RECEIVE_SALES_NETWORKS';
export const RECEIVE_SALES_NETWORK = 'RECEIVE_SALES_NETWORK';
export const REMOVE_SALES_NETWORK = "REMOVE_SALES_NETWORK";

export const retrieveSearchResults = salesNetworks => ({
  type: RECEIVE_SEARCH_NETWORKS,
  salesNetworks,
});
export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_NETWORKS,
});

export const receiveUserNetworks = networks => ({
  type: RECEIVE_USER_SALES_NETWORKS,
  networks,
});

export const receiveUserNetwork = network => ({
  type: RECEIVE_USER_SALES_NETWORK,
  network,
});

export const removeUserNetwork = (networkId) => ({
  type: REMOVE_USER_SALES_NETWORK,
  networkId
});

export const retrieveNetworkDetails = networkDetails => ({
  type: RECEIVE_SALES_NETWORK_DETAILS,
  networkDetails,
});
export const clearNetworkDetails = () => ({
  type: CLEAR_SALES_NETWORK_DETAILS,
});

export const setDashboardTarget = (target) => ({
  type: SET_CURRENT_DASHBOARD_TARGET,
  target
})

export const receiveSalesNetworks = networks => ({
  type: RECEIVE_SALES_NETWORKS,
  networks,
});

export const receiveSalesNetwork = network => ({
  type: RECEIVE_SALES_NETWORK,
  network,
});

export const removeSalesNetwork = (networkId) => ({
  type: REMOVE_SALES_NETWORK,
  networkId
});

export const fetchUserNetworks = () => dispatch => (
  SalesApiUtil.fetchUserNetworks()
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveNetworkDetails(data.networkDetails))
      dispatch(receiveSalesNetworks(data.salesNetworks))
      // dispatch(setDashboardTarget(data.currentNetworkId))
      dispatch(receiveSalesUserPermissions(data.salesUserPermissions))
      dispatch(receiveSalesAdminNetworks(data.salesAdminNetworks))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesNetworkErrors(errors))
    })
);

export const searchNetworks = (domain) => dispatch => (
  SalesApiUtil.searchNetworks(domain)
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveNetworkDetails(data.networkDetails))
      dispatch(retrieveSearchResults(data.salesNetworks))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesNetworkErrors(errors))
    })
);
