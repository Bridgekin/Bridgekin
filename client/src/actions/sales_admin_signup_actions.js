import * as SalesAdminSignupApiUtil from '../util/sales_admin_signup_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesAdminSignupErrors } from './error_actions';
import { receiveSalesProducts, receiveSalesProduct } from './sales_product_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_ADMIN_SIGNUP_LINK = 'RECEIVE_ADMIN_SIGNUP_LINK';
export const CLEAR_ADMIN_SIGNUP_LINK = 'CLEAR_ADMIN_SIGNUP_LINK';

export const retrieveAdminSignupLink = link => ({
  type: RECEIVE_ADMIN_SIGNUP_LINK,
  link,
});
export const clearAdminSignupLink = () => ({
  type: CLEAR_ADMIN_SIGNUP_LINK,
});

export const fetchAdminSignupLink = (code) => dispatch => (
  SalesAdminSignupApiUtil.fetchAdminSignupLink(code)
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveAdminSignupLink(data.link))
      dispatch(receiveSalesProduct(data.salesProduct))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesAdminSignupErrors(errors))
    })
);
