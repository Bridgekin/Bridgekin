// import * as SalesNetworkInviteApiUtil from '../util/sales_network_invite_api_util';
import { handleErrors } from './fetch_error_handler';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SALES_USER_PERMISSIONS = 'RECEIVE_SALES_USER_PERMISSIONS';
export const RECEIVE_SALES_USER_PERMISSION = 'RECEIVE_SALES_USER_PERMISSION';
export const REMOVE_SALES_USER_PERMISSION = 'REMOVE_SALES_USER_PERMISSION';

export const receiveSalesUserPermissions = userPermissions => ({
  type: RECEIVE_SALES_USER_PERMISSIONS,
  userPermissions,
});
export const receiveSalesUserPermission = userPermission => ({
  type: RECEIVE_SALES_USER_PERMISSION,
  userPermission,
});
export const removeSalesUserPermission = userPermissionId => ({
  type: REMOVE_SALES_USER_PERMISSION,
  userPermissionId
});