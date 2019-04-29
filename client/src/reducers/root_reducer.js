import { combineReducers } from 'redux';
import entitiesReducer from './entities/entities_reducer';
import modalsReducer from './modals/modals_reducer';
import sessionReducer from './session/session_reducer';
import usersReducer from './users/users_reducer';
import siteTemplateReducer from './site_templates/site_template_reducer.js';
import workspaceReducer from './site_templates/workspace_reducer.js';
// import windowReducer from './util/window_reducer.js';
import utilReducer from './util/util_reducer';
import errorsReducer from './errors/errors_reducer';

import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const appReducer = combineReducers({
  entities: entitiesReducer,
  modals: modalsReducer,
  session: sessionReducer,
  users: usersReducer,
  siteTemplate: siteTemplateReducer,
  workspaces: workspaceReducer,
  util: utilReducer,
  errors: errorsReducer
});

export default ( state, action ) => {
  if ( action.type === LOGOUT_CURRENT_USER ) {
    state = undefined;
  }

  return appReducer(state, action)
}
