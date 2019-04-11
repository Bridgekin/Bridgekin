import * as PassedOpportunityApiUtil from '../util/passed_opportunities_api_util';
import { handleErrors } from './fetch_error_handler';
import { receivePassedOpportunityErrors } from './error_actions';
import { receiveOpportunities, receiveOpportunity } from './opportunity_actions';
import { removeNetworkOppId } from './network_opp_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_PASSED_OPPORTUNITIES = 'RECEIVE_PASSED_OPPORTUNITIES';
export const RECEIVE_PASSED_OPPORTUNITY = 'RECEIVE_PASSED_OPPORTUNITY';
export const REMOVE_PASSED_OPPORTUNITY = "REMOVE_PASSED_OPPORTUNITY";

export const receivePassedOpportunities = opportunityIds => ({
  type: RECEIVE_PASSED_OPPORTUNITIES,
  opportunityIds,
});

export const receivePassedOpportunity = opportunityId => ({
  type: RECEIVE_PASSED_OPPORTUNITY,
  opportunityId,
});

export const removePassedOpportunity = () => ({
  type: REMOVE_PASSED_OPPORTUNITY,
});

export const fetchPassedOpportunities = () => dispatch => (
  PassedOpportunityApiUtil.fetchPassedOpportunities()
    .then(handleErrors)
    .then(data => {
      dispatch(receivePassedOpportunities(data.passedOpportunityIds));
      dispatch(receiveOpportunities(data.opportunities))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receivePassedOpportunityErrors(errors))
    })
);

export const createPassedOpportunity = (opportunityId) => dispatch => (
  PassedOpportunityApiUtil.createPassedOpportunity(opportunityId)
    .then(handleErrors)
    .then(data => {
      dispatch(receivePassedOpportunity(opportunityId))
      dispatch(receiveOpportunity(data.opportunity))
      dispatch(removeNetworkOppId(opportunityId))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receivePassedOpportunityErrors(errors))
    })
);

export const deletePassedOpportunity = (opportunityId) => dispatch => (
  PassedOpportunityApiUtil.deletePassedOpportunity(opportunityId)
    .then(handleErrors)
    .then(data => dispatch(removePassedOpportunity(opportunityId)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receivePassedOpportunityErrors(errors))
    })
);
