import * as RefLinkApiUtil from '../../util/deprecated/ref_link_api_util';
import { handleErrors } from '../fetch_error_handler';
import { receiveRefLinkErrors } from '../error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_REF_LINK = 'RECEIVE_REF_LINK';

export const receiveRefLink = refLink => ({
  type: RECEIVE_REF_LINK,
  refLink,
});

export const createRefLink = (id) => dispatch => (
  RefLinkApiUtil.createRefLink(id)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRefLink(data.refOppLink));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveRefLinkErrors(errors))
    })
);