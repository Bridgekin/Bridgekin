import * as NetworkAdminApiUtil from '../util/network_admins_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveManagedNetworkErrors } from './error_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_MANAGED_NETWORKS = 'RECEIVE_MANAGED_NETWORKS';
export const RECEIVE_MANAGED_NETWORK = 'RECEIVE_MANAGED_NETWORK';
export const REMOVE_MANAGED_NETWORK = "REMOVE_MANAGED_NETWORK";

export const RECEIVE_MANAGED_USERS = 'RECEIVE_MANAGED_USERS';
export const RECEIVE_MANAGED_USER = 'RECEIVE_MANAGED_USER';
export const REMOVE_MANAGED_USER = "REMOVE_MANAGED_USER";

export const receiveManagedNetworks = managedNetworks => ({
  type: RECEIVE_MANAGED_NETWORKS,
  managedNetworks,
});

export const receiveManagedNetwork = managedNetwork => ({
  type: RECEIVE_MANAGED_NETWORK,
  managedNetwork,
});

export const removeManagedNetwork = managedNetworkID => ({
  type: REMOVE_MANAGED_NETWORK,
  managedNetworkID
});

export const receiveManagedUserIds = managedUserIds => ({
  type: RECEIVE_MANAGED_USERS,
  managedUserIds,
});

export const receiveManagedUser = managedUserId => ({
  type: RECEIVE_MANAGED_USER,
  managedUserId,
});

export const removeManagedUser = managedUserId => ({
  type: REMOVE_MANAGED_USER,
  managedUserId
});

export const fetchManagedNetworks = () => dispatch => (
  NetworkAdminApiUtil.fetchManagedNetworks()
    .then(handleErrors)
    .then(data => dispatch(receiveManagedNetworks(data.managedNetworks)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveManagedNetworkErrors(errors))
    })
);

export const fetchManagedUsers = () => dispatch => (
  NetworkAdminApiUtil.fetchManagedUsers()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveManagedUserIds(data.managedUserIds))
      dispatch(receiveUsers(data.managedUsers))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveManagedNetworkErrors(errors))
    })
);
