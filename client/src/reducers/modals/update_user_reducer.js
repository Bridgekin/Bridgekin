import {
  OPEN_UPDATE_USER_MODAL,
  CLOSE_UPDATE_USER_MODAL } from '../../actions/modal_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_UPDATE_USER_MODAL:
      return merge({}, { open: true,
        settingsType: action.settingsType });
    case CLOSE_UPDATE_USER_MODAL:
      return {};
    default:
      return state;
  }
};
