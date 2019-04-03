import { RECEIVE_HEIGHT } from '../../actions/util_actions';
import merge from 'lodash/merge';

export default(state = window.innerHeight, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_HEIGHT:
      return action.height
    default:
      return state;
  }
};
