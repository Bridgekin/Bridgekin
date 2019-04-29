import { CONSUME_TUTORIAL_SESSION } from '../../actions/util_actions';
import merge from 'lodash/merge';

export default(state = {tutorialTour: false}, action) => {
  Object.freeze(state);
  // let newState = merge({}, state);

  switch(action.type){
    case CONSUME_TUTORIAL_SESSION:
      return merge({}, {tutorialTour: true})
    default:
      return state;
  }
};
