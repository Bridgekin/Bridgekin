import {
  RECEIVE_EMAIL_TEMPLATE,
  REMOVE_EMAIL_TEMPLATE} from '../../actions/email_template_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_EMAIL_TEMPLATE:
      return merge({}, action.template);
    case REMOVE_EMAIL_TEMPLATE:
      return {};
    default:
      return state;
  }
};
