import * as OppPermissionApiUtil from '../util/opp_permissions_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveOppPermissionErrors } from './error_actions';
import { receiveNetworks } from './network_actions';
import { receiveConnections } from './connection_actions';
import { receiveCircles } from './circle_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SHARE_OPTIONS = 'RECEIVE_SHARE_OPTIONS';
export const RECEIVE_OPP_PERMISSIONS = 'RECEIVE_OPP_PERMISSIONS';
// export const RECEIVE_OPP_PERMISSION = 'RECEIVE_OPP_PERMISSION';
// export const REMOVE_OPP_PERMISSION = "REMOVE_OPP_PERMISSION";

export const receiveOppPermissions = oppPermissions => ({
  type: RECEIVE_OPP_PERMISSIONS,
  oppPermissions,
});

export const receiveShareOptions = shareOptions => ({
  type: RECEIVE_SHARE_OPTIONS,
  shareOptions,
});

// export const receiveOppPermission = oppPermission => ({
//   type: RECEIVE_OPP_PERMISSION,
//   oppPermission,
// });
//
// export const removeOppPermission = oppPermission => ({
//   type: REMOVE_OPP_PERMISSION,
//   oppPermission
// });

export const RECEIVE_NETWORK_OPP_PERMISSIONS = 'RECEIVE_NETWORK_OPP_PERMISSIONS';
export const RECEIVE_NETWORK_OPP_PERMISSION = 'RECEIVE_NETWORK_OPP_PERMISSION';
export const REMOVE_NETWORK_OPP_PERMISSION = "REMOVE_NETWORK_OPP_PERMISSION";

export const receiveNetworkOppPermissions = oppPerms => ({
  type: RECEIVE_NETWORK_OPP_PERMISSIONS,
  oppPerms,
});

export const receiveNetworkOppPermission = oppPerm => ({
  type: RECEIVE_NETWORK_OPP_PERMISSION,
  oppPerm,
});

export const removeNetworkOppPermission = oppPermId => ({
  type: REMOVE_NETWORK_OPP_PERMISSION,
  oppPermId
});

export const fetchOppPermissions = (opportunityId) => dispatch => (
  OppPermissionApiUtil.fetchOppPermissions(opportunityId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveOppPermissions(data.constructedPerms))
      dispatch(receiveNetworks(data.networks))
      dispatch(receiveConnections(data.connections))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOppPermissionErrors(errors))
    })
);

export const fetchShareOptions = () => dispatch => (
  OppPermissionApiUtil.fetchShareOptions()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveShareOptions(data.shareOptions));
      dispatch(receiveNetworks(data.networks));
      dispatch(receiveConnections(data.connections));
      dispatch(receiveCircles(data.circles));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOppPermissionErrors(errors))
    })
);
