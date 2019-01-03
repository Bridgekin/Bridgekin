export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const RECEIVE_WAITLIST_USER_ERRORS = 'RECEIVE_WAITLIST_USER_ERRORS';
export const CLEAR_WAITLIST_USER_ERRORS = 'CLEAR_WAITLIST_USER_ERRORS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';

export const RECEIVE_OPPORTUNITY_ERRORS = 'RECEIVE_OPPORTUNITY_ERRORS';
export const CLEAR_OPPORTUNITY_ERRORS = 'CLEAR_OPPORTUNITY_ERRORS';
export const RECEIVE_CONNECTED_OPPORTUNITY_ERRORS = 'RECEIVE_CONNECTED_OPPORTUNITY_ERRORS';
export const CLEAR_CONNECTED_OPPORTUNITY_ERRORS = 'CLEAR_CONNECTED_OPPORTUNITY_ERRORS';
export const RECEIVE_FINALIZED_OPPORTUNITY_ERRORS = 'RECEIVE_FINALIZED_OPPORTUNITY_ERRORS';
export const CLEAR_FINALIZED_OPPORTUNITY_ERRORS = 'CLEAR_FINALIZED_OPPORTUNITY_ERRORS';
export const RECEIVE_SAVED_OPPORTUNITY_ERRORS = 'RECEIVE_SAVED_OPPORTUNITY_ERRORS';
export const CLEAR_SAVED_OPPORTUNITY_ERRORS = 'CLEAR_SAVED_OPPORTUNITY_ERRORS';

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const receiveWaitlistUserErrors = errors => ({
  type: RECEIVE_WAITLIST_USER_ERRORS,
  errors
});

export const clearWaitlistUserErrors = () => ({
  type: CLEAR_WAITLIST_USER_ERRORS,
});

export const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const clearUserErrors = () => ({
  type: CLEAR_USER_ERRORS,
});

export const receiveOpportunityErrors = errors => ({
  type: RECEIVE_OPPORTUNITY_ERRORS,
  errors
});

export const clearOpportunityErrors = () => ({
  type: CLEAR_OPPORTUNITY_ERRORS,
});

export const receiveConnectedOpportunityErrors = errors => ({
  type: RECEIVE_CONNECTED_OPPORTUNITY_ERRORS,
  errors
});

export const clearConnectedOpportunityErrors = () => ({
  type: CLEAR_CONNECTED_OPPORTUNITY_ERRORS,
});

export const receiveFinalizedOpportunityErrors = errors => ({
  type: RECEIVE_FINALIZED_OPPORTUNITY_ERRORS,
  errors
});

export const clearFinalizedOpportunityErrors = () => ({
  type: CLEAR_FINALIZED_OPPORTUNITY_ERRORS,
});

export const receiveSavedOpportunityErrors = errors => ({
  type: RECEIVE_SAVED_OPPORTUNITY_ERRORS,
  errors
});

export const clearSavedOpportunityErrors = () => ({
  type: CLEAR_SAVED_OPPORTUNITY_ERRORS,
});

// export const receiveHomeErrors = errors => {
//   return {
//     type: RECEIVE_HOME_ERRORS,
//     errors
//   };
// };
//
// export const clearHomeErrors = () => ({
//   type: CLEAR_HOME_ERRORS,
// });
//
//
// export const receiveBookingErrors = errors => ({
//   type: RECEIVE_BOOKING_ERRORS,
//   errors
// });
//
// export const clearBookingErrors = () => ({
//   type: CLEAR_BOOKING_ERRORS,
// });
//
// export const receiveReviewErrors = errors => ({
//   type: RECEIVE_REVIEW_ERRORS,
//   errors
// });
//
// export const clearReviewErrors = () => ({
//   type: CLEAR_REVIEW_ERRORS,
// });
//
// export const receiveSearchErrors = errors => ({
//   type: RECEIVE_REVIEW_ERRORS,
//   errors
// });
//
// export const clearSearchErrors = () => ({
//   type: CLEAR_REVIEW_ERRORS,
// });
