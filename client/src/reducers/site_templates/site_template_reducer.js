import {
  RECEIVE_SITE_TEMPLATE,
  REMOVE_SITE_TEMPLATE
} from '../../actions/site_template_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_SITE_TEMPLATE:
      return merge({}, action.siteTemplate);
    case REMOVE_SITE_TEMPLATE:
      return {};
    default:
      return state;
  }
};
