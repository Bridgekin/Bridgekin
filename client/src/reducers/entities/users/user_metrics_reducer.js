import {
  RECEIVE_USER_METRICS} from '../../../actions/user_metric_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_USER_METRICS:
      return merge({}, action.metrics);
    default:
      return state;
  }
};
