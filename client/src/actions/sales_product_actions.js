import * as SalesProductApiUtil from '../util/saved_opportunities_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesProductErrors } from './error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SALES_PRODUCTS = 'RECEIVE_SALES_PRODUCTS';
export const RECEIVE_SALES_PRODUCT = 'RECEIVE_SALES_PRODUCT';
export const REMOVE_SALES_PRODUCT = "REMOVE_SALES_PRODUCT";

export const receiveSalesProducts = salesProducts => ({
  type: RECEIVE_SALES_PRODUCTS,
  salesProducts,
});

export const receiveSalesProduct = salesProduct => ({
  type: RECEIVE_SALES_PRODUCT,
  salesProduct,
});

export const removeSalesProduct = salesProductId => ({
  type: REMOVE_SALES_PRODUCT,
  salesProductId
});

// export const fetchSalesProducts = () => dispatch => (
//   SalesProductApiUtil.fetchSalesProducts()
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveSalesProducts(data.SalesProducts))
//       dispatch(receiveOpportunities(data.opportunities))
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveSalesProductErrors(errors))
//     })
// );

// export const createSalesProduct = (opportunityId) => dispatch => (
//   SalesProductApiUtil.createSalesProduct(opportunityId)
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveSalesProduct(data.SalesProduct))
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveSalesProductErrors(errors))
//     })
// );

// export const deleteSalesProduct = (SalesProduct) => dispatch => (
//   SalesProductApiUtil.deleteSalesProduct(SalesProduct.id)
//     .then(handleErrors)
//     .then(data => dispatch(removeSalesProduct(SalesProduct.opportunityId)))
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveSalesProductErrors(errors))
//     })
// );
