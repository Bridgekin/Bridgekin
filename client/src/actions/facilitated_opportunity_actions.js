export const RECEIVE_FACILITATED_OPPORTUNITIES = 'RECEIVE_FACILITATED_OPPORTUNITIES';
export const RECEIVE_FACILITATED_OPPORTUNITY = 'RECEIVE_FACILITATED_OPPORTUNITY';
export const REMOVE_FACILITATED_OPPORTUNITY = "REMOVE_FACILITATED_OPPORTUNITY";

export const receiveFacilitatedOpportunities = opportunities => ({
  type: RECEIVE_FACILITATED_OPPORTUNITIES,
  opportunities,
});

export const receiveFacilitatedOpportunity = opportunity => ({
  type: RECEIVE_FACILITATED_OPPORTUNITY,
  opportunity,
});

export const removeFacilitatedOpportunity = opportunityId => ({
  type: REMOVE_FACILITATED_OPPORTUNITY,
  opportunityId
});
