import * as SavedOppportunityApiUtil from '../util/saved_opportunities_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSavedOpportunityErrors } from './error_actions';
import { receiveOpportunities } from './opportunity_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SAVED_OPPORTUNITIES = 'RECEIVE_SAVED_OPPORTUNITIES';
export const RECEIVE_SAVED_OPPORTUNITY = 'RECEIVE_SAVED_OPPORTUNITY';
export const REMOVE_SAVED_OPPORTUNITY = "REMOVE_SAVED_OPPORTUNITY";

export const receiveSavedOpportunities = savedOpportunities => ({
  type: RECEIVE_SAVED_OPPORTUNITIES,
  savedOpportunities,
});

export const receiveSavedOpportunity = savedOpportunity => ({
  type: RECEIVE_SAVED_OPPORTUNITY,
  savedOpportunity,
});

export const removeSavedOpportunity = savedOpportunityId => ({
  type: REMOVE_SAVED_OPPORTUNITY,
  savedOpportunityId
});

export const fetchSavedOpportunities = () => dispatch => (
  SavedOppportunityApiUtil.fetchSavedOpportunities()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveSavedOpportunities(data.savedOpportunities))
      dispatch(receiveOpportunities(data.opportunities))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveSavedOpportunityErrors(errors))
    })
);

export const createSavedOppportunity = (opportunityId) => dispatch => (
  SavedOppportunityApiUtil.createSavedOpportunity(opportunityId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveSavedOpportunity(data.savedOpportunity))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveSavedOpportunityErrors(errors))
    })
);

export const deleteSavedOppportunity = (savedOpportunity) => dispatch => (
  SavedOppportunityApiUtil.deleteSavedOpportunity(savedOpportunity.id)
    .then(handleErrors)
    .then(data => dispatch(removeSavedOpportunity(savedOpportunity.opportunityId)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveSavedOpportunityErrors(errors))
    })
);
