import {
  RECEIVE_REQUEST_TEMPLATES,
  RECEIVE_REQUEST_TEMPLATE,
  REMOVE_REQUEST_TEMPLATE
} from '../../../actions/request_templates_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_REQUEST_TEMPLATES:
      return merge({}, action.requestTemplates);
    case RECEIVE_REQUEST_TEMPLATE:
      return merge({}, state, {[action.requestTemplate.id]: action.requestTemplate })
    case REMOVE_REQUEST_TEMPLATE:
      return {}; 
    default:
      return state;
  }
};
