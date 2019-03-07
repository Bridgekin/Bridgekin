import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';

const prod = process.env.NODE_ENV === 'production';

export default (preloadedState = {}) => {
  if(prod){
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(thunk)
    )
  } else {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(thunk, logger)
    )
  }
}
