export const RECEIVE_NETWORK_OPPS = 'RECEIVE_NETWORK_OPPS';
export const RECEIVE_NETWORK_OPP = 'RECEIVE_NETWORK_OPP';
export const REMOVE_NETWORK_OPP = "REMOVE_NETWORK_OPP";

export const receiveNetworkOpps = networkOppIds => ({
  type: RECEIVE_NETWORK_OPPS,
  networkOppIds,
});

export const receiveNetworkOppId = networkOppId => ({
  type: RECEIVE_NETWORK_OPP,
  networkOppId,
});

export const removeNetworkOppId = networkOppId => ({
  type: REMOVE_NETWORK_OPP,
  networkOppId
});
