export const RECEIVE_USER_OPPORTUNITIES = 'RECEIVE_USER_OPPORTUNITIES';
export const RECEIVE_USER_OPPORTUNITY = 'RECEIVE_USER_OPPORTUNITY';
export const REMOVE_USER_OPPORTUNITY = "REMOVE_USER_OPPORTUNITY";

export const receiveUserOpportunities = userOpportunityIds => ({
  type: RECEIVE_USER_OPPORTUNITIES,
  userOpportunityIds,
});

export const receiveUserOpportunity = userOpportunityId => ({
  type: RECEIVE_USER_OPPORTUNITY,
  userOpportunityId,
});

export const removeUserOpportunity = userOpportunityId => ({
  type: REMOVE_USER_OPPORTUNITY,
  userOpportunityId
});
