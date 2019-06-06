import * as RefApplicationApiUtil from '../util/ref_applications_api_util';
import { handleErrors } from './fetch_error_handler';
// import { receiveUserFeatureErrors } from './error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const UPDATE_DRAFT_POSTING = 'UPDATE_DRAFT_POSTING';
export const RESET_DRAFT_POSTING = 'UPDATE_DRAFT_POSTING';
export const UPDATE_DRAFT_FLAG = 'UPDATE_DRAFT_FLAG'

export const updateDraftPosting = draftPosting => ({
  type: UPDATE_DRAFT_POSTING,
  draftPosting
});

export const resetDraftPosting = () => ({
  type: RESET_DRAFT_POSTING
});

export const updateDraftFlag = draftFlag => ({
  type: UPDATE_DRAFT_FLAG,
  draftFlag
});

export const requestDemo = (payload) => dispatch => (
  RefApplicationApiUtil.requestDemo(payload)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      // dispatch(receiveUserFeatureErrors(errors))
    })
)

// export const updateUserFeature = (payload) => dispatch => (
//   UserFeatureApiUtil.updateUserFeature(payload)
//     .then(handleErrors)
//     .then(data => dispatch(receiveUserFeature(data.userFeature)))
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveUserFeatureErrors(errors))
//     })
// )
