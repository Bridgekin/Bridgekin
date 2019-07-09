import {
  RECEIVE_ADMIN_SIGNUP_LINK,
  CLEAR_ADMIN_SIGNUP_LINK
} from '../../../actions/sales_admin_signup_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ADMIN_SIGNUP_LINK:
      return merge({}, action.link)
    case CLEAR_ADMIN_SIGNUP_LINK:
      return {}
    default:
      return state;
  }
};
