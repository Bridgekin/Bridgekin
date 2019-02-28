export const RECEIVE_FACILITATED_OPPORTUNITIES = 'RECEIVE_FACILITATED_OPPORTUNITIES';
export const RECEIVE_FACILITATED_OPPORTUNITY = 'RECEIVE_FACILITATED_OPPORTUNITY';
export const REMOVE_FACILITATED_OPPORTUNITY = "REMOVE_FACILITATED_OPPORTUNITY";

export const receiveFacilitatedOpportunities = facilitatedOppIds => ({
  type: RECEIVE_FACILITATED_OPPORTUNITIES,
  facilitatedOppIds,
});

export const receiveFacilitatedOpportunity = facilitatedOppId => ({
  type: RECEIVE_FACILITATED_OPPORTUNITY,
  facilitatedOppId,
});

export const removeFacilitatedOpportunity = facilitatedOppId => ({
  type: REMOVE_FACILITATED_OPPORTUNITY,
  facilitatedOppId
});
