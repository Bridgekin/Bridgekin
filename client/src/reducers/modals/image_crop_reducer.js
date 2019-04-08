import {
  OPEN_IMAGE_CROP_MODAL,
  CLOSE_IMAGE_CROP_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_IMAGE_CROP_MODAL:
      return merge({}, {open: true }, action.payload);
    case CLOSE_IMAGE_CROP_MODAL:
      return {};
    default:
      return state;
  }
};
