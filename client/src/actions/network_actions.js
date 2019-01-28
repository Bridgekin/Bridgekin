import * as NetworkApiUtil from '../util/networks_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveNetworkErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_NETWORKS = 'RECEIVE_NETWORKS';
export const RECEIVE_NETWORK = 'RECEIVE_NETWORK';
export const REMOVE_NETWORK = "REMOVE_NETWORK";

export const receiveNetworks = networks => ({
  type: RECEIVE_NETWORKS,
  networks,
});

export const receiveNetwork = network => ({
  type: RECEIVE_NETWORK,
  network,
});

export const removeNetwork = () => ({
  type: REMOVE_NETWORK,
});

export const fetchNetworks = () => dispatch => (
  NetworkApiUtil.fetchNetworks()
    .then(handleErrors)
    .then(data => dispatch(receiveNetworks(data.networks)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNetworkErrors(errors))
    })
);

export const fetchNetwork = (id) => dispatch => (
  NetworkApiUtil.fetchNetwork(id)
    .then(handleErrors)
    .then(data => dispatch(receiveNetwork(data)))
    .catch(errors => dispatch(receiveNetworkErrors(errors)))
);

export const createNetwork = (network) => dispatch => (
  NetworkApiUtil.createNetwork(network)
    .then(handleErrors)
    .then(data => dispatch(receiveNetwork(data)))
    .catch(errors => dispatch(receiveNetworkErrors(errors)))
);

export const updateNetwork = (network) => dispatch => (
  NetworkApiUtil.updateNetwork(network)
    .then(handleErrors)
    .then(data => dispatch(receiveNetwork(data)))
    .catch(errors => dispatch(receiveNetworkErrors(errors)))
);

export const deleteNetwork = (id) => dispatch => (
  NetworkApiUtil.deleteNetwork(id)
    .then(handleErrors)
    .then(() => dispatch(removeNetwork(id)))
    .catch(errors => dispatch(receiveNetworkErrors(errors)))
);
