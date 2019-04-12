import * as Sentry from "@sentry/browser";
import Raven from "raven-js";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';
import createRavenMiddleware from "raven-for-redux";
import createSentryMiddleware from "redux-sentry-middleware";
import bugsnagMiddleware from 'redux-bugsnag-middleware';

const prod = process.env.NODE_ENV === 'production';

// Sentry.init({
//  dsn: "https://a84f2e17de8c43a7b66471a2bc28de50@sentry.io/1437155",
//  environment: process.env.NODE_ENV,
// });

const stateTransformer = state => {
  // make sure you don't change state tree
  const stateCopy = Object.assign({}, state);
  // make sure you don't change billing object (by reference)
  const usersCopy = Object.assign({}, stateCopy.users);
  let usersKeys = Object.keys(usersCopy)
  for(let i = 0; i < usersKeys.length; i++){
    let key = usersKeys[i];
    let user = Object.assign({}, usersCopy[key]);
    user.email = '######';
    user.fname = '######';
    user.lname = '######';
    usersCopy[key] = user;
  }
  // pass users copy to state copy
  stateCopy.users = usersCopy
  // return sanitized state
  return stateCopy;
}

export default (preloadedState = {}) => {
  if(prod){
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        createSentryMiddleware(Sentry),
        thunk
      )
    )
  } else {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        createSentryMiddleware(Sentry, {
          stateTransformer
        }),
        thunk,
        logger,
      )
    )
  }
}
