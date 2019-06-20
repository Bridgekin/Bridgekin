import {
  RECEIVE_SALES_INTROS,
  RECEIVE_SALES_INTRO,
  REMOVE_SALES_INTRO
} from '../../../actions/sales_intro_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_INTROS:
      return merge({}, state, action.intros);
    case RECEIVE_SALES_INTRO:
      return merge({}, state, { [action.intro.id]: action.intro });
    case REMOVE_SALES_INTRO:
      delete newState[action.introId]
      return newState;
    default:
      return state;
  }
};
