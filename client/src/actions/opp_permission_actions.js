export const RECEIVE_OPP_PERMISSIONS = 'RECEIVE_OPP_PERMISSIONS';
export const RECEIVE_OPP_PERMISSION = 'RECEIVE_OPP_PERMISSION';
export const REMOVE_OPP_PERMISSION = "REMOVE_OPP_PERMISSION";

export const receiveOppPermissions = oppPermissions => ({
  type: RECEIVE_OPP_PERMISSIONS,
  oppPermissions,
});

export const receiveOppPermission = oppPermission => ({
  type: RECEIVE_OPP_PERMISSION,
  oppPermission,
});

export const removeOppPermission = oppPermission => ({
  type: REMOVE_OPP_PERMISSION,
  oppPermission
});
