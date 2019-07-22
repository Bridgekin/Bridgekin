import * as RefOpportunityApiUtil from '../../util/deprecated/ref_opps_api_util';
import { handleErrors } from '../fetch_error_handler';
import { receiveRefOppErrors } from '../error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_REF_OPPS = 'RECEIVE_REF_OPPS';
export const RECEIVE_REF_OPP = 'RECEIVE_REF_OPP';
export const REMOVE_REF_OPP = "REMOVE_REF_OPP";

export const receiveRefOpps = refOpps => ({
  type: RECEIVE_REF_OPPS,
  refOpps,
});

export const receiveRefOpp = refOpp => ({
  type: RECEIVE_REF_OPP,
  refOpp,
});

export const removeRefOpp = refOppId => ({
  type: REMOVE_REF_OPP,
  refOppId
});

export const RECEIVE_OWNED_REF_OPPS = 'RECEIVE_OWNED_REF_OPPS';
export const RECEIVE_OWNED_REF_OPP = 'RECEIVE_OWNED_REF_OPP';
export const receiveOwnedRefOpps = ownedRefOpps => ({
  type: RECEIVE_OWNED_REF_OPPS,
  ownedRefOpps,
});
export const receiveOwnedRefOpp = ownedRefOppId => ({
  type: RECEIVE_OWNED_REF_OPP,
  ownedRefOppId,
});

export const fetchRefOpps = () => dispatch => (
  RefOpportunityApiUtil.fetchRefOpps()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefOpps(data.refOpps));
      dispatch(receiveOwnedRefOpps(data.ownedOpps));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefOppErrors(errors))
    })
);

export const fetchRefOpp = (id) => dispatch => (
  RefOpportunityApiUtil.fetchRefOpp(id)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefOpp(data.refOpp));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefOppErrors(errors))
    })
);

export const createRefOpp = (refOpp) => dispatch => (
  RefOpportunityApiUtil.createRefOpp(refOpp)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefOpp(data.refOpp));
      dispatch(receiveOwnedRefOpp(data.refOpp.id))
      return data.refOpp
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefOppErrors(errors))
    })
);

export const updateRefOpp = (refOpp) => dispatch => (
  RefOpportunityApiUtil.updateRefOpp(refOpp)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefOpp(data.refOpp));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefOppErrors(errors))
    })
);

export const deleteRefOpp = (id) => dispatch => (
  RefOpportunityApiUtil.deleteRefOpp(id)
    .then(handleErrors)
    .then(() => dispatch(removeRefOpp(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefOppErrors(errors))
    })
);

