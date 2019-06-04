import * as RefApplicationApiUtil from '../util/ref_applications_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveRefApplicationErrors } from './error_actions';
import { receiveRefOpps } from './ref_opportunity_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_REF_APPLICATIONS = 'RECEIVE_REF_APPLICATIONS';
export const RECEIVE_REF_APPLICATION = 'RECEIVE_REF_APPLICATION';
export const REMOVE_REF_APPLICATION = "REMOVE_REF_APPLICATION";

export const RECEIVE_OWNED_APPLICATIONS = 'RECEIVE_OWNED_APPLICATIONS';
export const RECEIVE_SUBMITTED_APPLICATIONS = 'RECEIVE_SUBMITTED_APPLICATIONS';
export const RECEIVE_SUBMITTED_APPLICATION = 'RECEIVE_SUBMITTED_APPLICATION';

export const receiveRefApplications = refApplications => ({
  type: RECEIVE_REF_APPLICATIONS,
  refApplications,
});

export const receiveRefApplication = refApplication => ({
  type: RECEIVE_REF_APPLICATION,
  refApplication,
});

export const removeRefApplication = refApplicationId => ({
  type: REMOVE_REF_APPLICATION,
  refApplicationId
});

export const receiveOwnedApps = ownedApps => ({
  type: RECEIVE_OWNED_APPLICATIONS,
  ownedApps,
});

export const receiveSubmittedApps = submittedApps => ({
  type: RECEIVE_SUBMITTED_APPLICATIONS,
  submittedApps,
});

export const receiveSubmittedApp = submittedApp => ({
  type: RECEIVE_SUBMITTED_APPLICATIONS,
  submittedApp,
});

export const fetchRefApplications = () => dispatch => (
  RefApplicationApiUtil.fetchRefApplications()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefApplications(data.refApplications));
      dispatch(receiveSubmittedApps(data.submittedApplications));
      dispatch(receiveOwnedApps(data.ownedApplications));
      dispatch(receiveRefOpps(data.refOpps));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefApplicationErrors(errors))
    })
);

export const fetchRefApplication = (id) => dispatch => (
  RefApplicationApiUtil.fetchRefApplication(id)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefApplication(data.refApplication));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefApplicationErrors(errors))
    })
);

export const createRefApplication = (refApplication) => dispatch => (
  RefApplicationApiUtil.createRefApplication(refApplication)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefApplication(data.refApplication));
      dispatch(receiveSubmittedApp(data.refApplication.id));
      return data.refApplication
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefApplicationErrors(errors))
    })
);

export const updateRefApplication = (refApplication) => dispatch => (
  RefApplicationApiUtil.updateRefApplication(refApplication)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefApplication(data.refApplication));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefApplicationErrors(errors))
    })
);

export const updateRefAppStatus = (payload) => dispatch => (
  RefApplicationApiUtil.updateRefAppStatus(payload)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefApplication(data.refApplication));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefApplicationErrors(errors))
    })
);

export const deleteRefApplication = (id) => dispatch => (
  RefApplicationApiUtil.deleteRefApplication(id)
    .then(handleErrors)
    .then(() => dispatch(removeRefApplication(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefApplicationErrors(errors))
    })
);

