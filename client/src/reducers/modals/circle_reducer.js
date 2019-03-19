import {
  OPEN_CIRCLE_MODAL,
  CLOSE_CIRCLE_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_CIRCLE_MODAL:
      return merge({}, {open: true, circleId: action.circleId});
    case CLOSE_CIRCLE_MODAL:
      return {};
    default:
      return state;
  }
};
