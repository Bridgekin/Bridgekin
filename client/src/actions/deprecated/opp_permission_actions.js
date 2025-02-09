// import * as OppPermissionApiUtil from '../../util/deprecated/opp_permissions_api_util';
// import { handleErrors } from '../fetch_error_handler';
// import { receiveOppPermissionErrors } from '../error_actions';
// import { receiveNetworks } from './network_actions';
// import { receiveConnections } from './connection_actions';
// import { receiveCircles } from './circle_actions';
// import { receiveUsers } from '../user_actions';

// const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

// export const RECEIVE_SHARE_OPTIONS = 'RECEIVE_SHARE_OPTIONS';
// export const REMOVE_SHARE_OPTIONS = 'REMOVE_SHARE_OPTIONS';
// export const RECEIVE_OPP_PERMISSIONS = 'RECEIVE_OPP_PERMISSIONS';
// // export const RECEIVE_OPP_PERMISSION = 'RECEIVE_OPP_PERMISSION';
// // export const REMOVE_OPP_PERMISSION = "REMOVE_OPP_PERMISSION";

// export const receiveOppPermissions = oppPermissions => ({
//   type: RECEIVE_OPP_PERMISSIONS,
//   oppPermissions,
// });

// export const receiveShareOptions = shareOptions => ({
//   type: RECEIVE_SHARE_OPTIONS,
//   shareOptions,
// });

// export const removeShareOptions = () => ({
//   type: REMOVE_SHARE_OPTIONS
// });

// // export const receiveOppPermission = oppPermission => ({
// //   type: RECEIVE_OPP_PERMISSION,
// //   oppPermission,
// // });
// //
// // export const removeOppPermission = oppPermission => ({
// //   type: REMOVE_OPP_PERMISSION,
// //   oppPermission
// // });

// export const RECEIVE_NETWORK_OPP_PERMISSIONS = 'RECEIVE_NETWORK_OPP_PERMISSIONS';
// export const RECEIVE_NETWORK_OPP_PERMISSION = 'RECEIVE_NETWORK_OPP_PERMISSION';
// export const REMOVE_NETWORK_OPP_PERMISSION = "REMOVE_NETWORK_OPP_PERMISSION";

// export const receiveNetworkOppPermissions = oppPerms => ({
//   type: RECEIVE_NETWORK_OPP_PERMISSIONS,
//   oppPerms,
// });

// export const receiveNetworkOppPermission = oppPerm => ({
//   type: RECEIVE_NETWORK_OPP_PERMISSION,
//   oppPerm,
// });

// export const removeNetworkOppPermission = oppPermId => ({
//   type: REMOVE_NETWORK_OPP_PERMISSION,
//   oppPermId
// });

// export const RECEIVE_USER_OPP_PERMISSIONS = 'RECEIVE_USER_OPP_PERMISSIONS';
// export const RECEIVE_USER_OPP_PERMISSION = 'RECEIVE_USER_OPP_PERMISSION';
// export const REMOVE_USER_OPP_PERMISSION = "REMOVE_USER_OPP_PERMISSION";

// export const receiveUserOppPermissions = oppPerms => ({
//   type: RECEIVE_USER_OPP_PERMISSIONS,
//   oppPerms,
// });

// export const receiveUserOppPermission = oppPerm => ({
//   type: RECEIVE_USER_OPP_PERMISSION,
//   oppPerm,
// });

// export const removeUserOppPermission = oppPermId => ({
//   type: REMOVE_USER_OPP_PERMISSION,
//   oppPermId
// });

// export const RECEIVE_PROFILE_OPP_PERMISSIONS = 'RECEIVE_PROFILE_OPP_PERMISSIONS';
// export const RECEIVE_PROFILE_OPP_PERMISSION = 'RECEIVE_PROFILE_OPP_PERMISSION';
// export const REMOVE_PROFILE_OPP_PERMISSION = "REMOVE_PROFILE_OPP_PERMISSION";

// export const receiveProfileOppPermissions = oppPerms => ({
//   type: RECEIVE_PROFILE_OPP_PERMISSIONS,
//   oppPerms,
// });

// export const receiveProfileOppPermission = oppPerm => ({
//   type: RECEIVE_PROFILE_OPP_PERMISSION,
//   oppPerm,
// });

// export const removeProfileOppPermission = oppPermId => ({
//   type: REMOVE_PROFILE_OPP_PERMISSION,
//   oppPermId
// });

// export const fetchOppPermissions = (opportunityId) => dispatch => (
//   OppPermissionApiUtil.fetchOppPermissions(opportunityId)
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveOppPermissions(data.constructedPerms))
//       dispatch(receiveNetworks(data.networks))
//       dispatch(receiveConnections(data.connections))
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveOppPermissionErrors(errors))
//     })
// );

// export const fetchShareOptions = () => dispatch => (
//   OppPermissionApiUtil.fetchShareOptions()
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveShareOptions(data.shareOptions));
//       dispatch(receiveNetworks(data.networks));
//       dispatch(receiveConnections(data.connections));
//       dispatch(receiveCircles(data.circles));
//       dispatch(receiveUsers(data.users));
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveOppPermissionErrors(errors))
//     })
// );
