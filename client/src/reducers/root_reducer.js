import { combineReducers } from 'redux';
import entitiesReducer from './entities/entities_reducer';
import sessionReducer from './session/session_reducer';
import usersReducer from './users/users_reducer';
import siteTemplateReducer from './site_templates/site_template_reducer.js';
import workspaceReducer from './site_templates/workspace_reducer.js';
import errorsReducer from './errors/errors_reducer';

export default combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  users: usersReducer,
  siteTemplate: siteTemplateReducer,
  workspaces: workspaceReducer,
  errors: errorsReducer
});
