// import * as NetworkApiUtil from '../../util/deprecated/networks_api_util';
// import { handleErrors } from '../fetch_error_handler';
// import { receiveNetworkErrors } from '../error_actions';
// import { receiveWorkspaceOptions } from '../workspace_actions';
// import { receiveCircles } from './circle_actions';

// const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

// // export const RECEIVE_USER_NETWORKS = 'RECEIVE_USER_NETWORKS';
// export const RECEIVE_NETWORKS = 'RECEIVE_NETWORKS';
// export const RECEIVE_NETWORK = 'RECEIVE_NETWORK';
// export const REMOVE_NETWORK = "REMOVE_NETWORK";

// // export const receiveUserNetworks = userNetworkIds => ({
// //   type: RECEIVE_USER_NETWORKS,
// //   userNetworkIds,
// // });

// export const receiveNetworks = networks => ({
//   type: RECEIVE_NETWORKS,
//   networks,
// });

// export const receiveNetwork = network => ({
//   type: RECEIVE_NETWORK,
//   network,
// });

// export const removeNetwork = () => ({
//   type: REMOVE_NETWORK,
// });

// // export const fetchUserNetworks = () => dispatch => (
// //   NetworkApiUtil.fetchUserNetworks()
// //     .then(handleErrors)
// //     .then(data => {
// //       dispatch(receiveNetworks(data.networks));
// //       dispatch(receiveUserNetworks(data.userNetworks));
// //     })
// //     .catch(errors => {
// //       if (!(errors instanceof Array)){
// //         errors = [genericError];
// //       }
// //       dispatch(receiveNetworkErrors(errors))
// //     })
// // );

// // export const fetchWorkspaceNetworks = (workspaceId) => dispatch => (
// //   NetworkApiUtil.fetchWorkspaceNetworks(workspaceId)
// //     .then(handleErrors)
// //     .then(data => {
// //       dispatch(receiveNetworks(data.networks))
// //       dispatch(receiveWorkspaceNetworks(data.workspaceNetworks))
// //     })
// //     .catch(errors => {
// //       if (!(errors instanceof Array)){
// //         errors = [genericError];
// //       }
// //       dispatch(receiveNetworkErrors(errors))
// //     })
// // );

// export const fetchWorkspaceOptions = (workspaceId) => dispatch => (
//   NetworkApiUtil.fetchWorkspaceOptions(workspaceId)
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveWorkspaceOptions(data.workspaceOptions));
//       dispatch(receiveNetworks(data.networks));
//       dispatch(receiveCircles(data.circles));
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveNetworkErrors(errors))
//     })
// );

// export const fetchNetwork = (id) => dispatch => (
//   NetworkApiUtil.fetchNetwork(id)
//     .then(handleErrors)
//     .then(data => dispatch(receiveNetwork(data)))
//     .catch(errors => dispatch(receiveNetworkErrors(errors)))
// );

// export const createNetwork = (network) => dispatch => (
//   NetworkApiUtil.createNetwork(network)
//     .then(handleErrors)
//     .then(data => dispatch(receiveNetwork(data)))
//     .catch(errors => dispatch(receiveNetworkErrors(errors)))
// );

// export const updateNetwork = (network) => dispatch => (
//   NetworkApiUtil.updateNetwork(network)
//     .then(handleErrors)
//     .then(data => dispatch(receiveNetwork(data)))
//     .catch(errors => dispatch(receiveNetworkErrors(errors)))
// );

// export const deleteNetwork = (id) => dispatch => (
//   NetworkApiUtil.deleteNetwork(id)
//     .then(handleErrors)
//     .then(() => dispatch(removeNetwork(id)))
//     .catch(errors => dispatch(receiveNetworkErrors(errors)))
// );
