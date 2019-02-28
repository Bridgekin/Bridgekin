import * as OppPermissionApiUtil from '../util/opp_permissions_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveOppPermissionErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_OPP_PERMISSIONS = 'RECEIVE_OPP_PERMISSIONS';
// export const RECEIVE_OPP_PERMISSION = 'RECEIVE_OPP_PERMISSION';
// export const REMOVE_OPP_PERMISSION = "REMOVE_OPP_PERMISSION";

export const receiveOppPermissions = oppPermissions => ({
  type: RECEIVE_OPP_PERMISSIONS,
  oppPermissions,
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

export const fetchOppPermissions = (opportunityId) => dispatch => (
  OppPermissionApiUtil.fetchOppPermissions(opportunityId)
    .then(handleErrors)
    .then(data => dispatch(receiveOppPermissions(data.constructedPerms)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOppPermissionErrors(errors))
    })
);
