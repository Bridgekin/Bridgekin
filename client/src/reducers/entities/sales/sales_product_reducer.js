import {
  RECEIVE_SALES_PRODUCTS,
  RECEIVE_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT
} from '../../../actions/sales_product_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_PRODUCTS:
      return merge({}, state, action.salesProducts);
    case RECEIVE_SALES_PRODUCT:
      return merge({}, state, { [action.salesProduct.id]: action.salesProduct });
    case REMOVE_SALES_PRODUCT:
      delete newState[action.salesProductId]
      return newState;
    default:
      return state;
  }
};
