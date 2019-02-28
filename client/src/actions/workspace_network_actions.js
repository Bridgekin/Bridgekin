export const RECEIVE_WORKSPACE_NETWORKS = 'RECEIVE_WORKSPACE_NETWORKS';
export const RECEIVE_WORKSPACE_NETWORK = 'RECEIVE_WORKSPACE_NETWORK';
export const REMOVE_WORKSPACE_NETWORK = "REMOVE_WORKSPACE_NETWORK";

export const receiveWorkspaceNetworks = workspaceNetworkIds => ({
  type: RECEIVE_WORKSPACE_NETWORKS,
  workspaceNetworkIds,
});

export const receiveWorkspaceNetworkId = workspaceNetworkId => ({
  type: RECEIVE_WORKSPACE_NETWORK,
  workspaceNetworkId,
});

export const removeWorkspaceNetworkId = workspaceNetworkId => ({
  type: REMOVE_WORKSPACE_NETWORK,
  workspaceNetworkId
});
