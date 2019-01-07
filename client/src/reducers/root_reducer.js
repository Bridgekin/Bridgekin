import { combineReducers } from 'redux';
import entitiesReducer from './entities/entities_reducer';
import sessionReducer from './session/session_reducer';
import usersReducer from './users/users_reducer';
import errorsReducer from './errors/errors_reducer';

export default combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  users: usersReducer,
  errors: errorsReducer
});
