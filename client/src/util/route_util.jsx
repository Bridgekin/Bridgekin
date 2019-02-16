import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
  // loggedIn: Boolean(state.session.id),
  currentUser: state.users[state.session.id],
});

const Auth = ({ currentUser, path, component: Component}) => (
  <Route
    path={path}
    render={props => (
      currentUser ? <Redirect to="/findandconnect" /> :
      <Component{...props} />
    )}
  />
);

// const Protected = ({ currentUser, path, component: Component}) => (
//   <Route
//     path={path}
//     render={props => (
//       currentUser ? <Component {...props} /> :
//       <Redirect to='/'/>
//     )}
//   />
// );

const Protected = ({ currentUser, path, component: Component, passedProps}) => {
  return <Route
    path={path}
    render={props => (
      currentUser ? <Component {...Object.assign({}, props, passedProps)} /> :
      <Redirect to='/'/>
    )}
  />
};

const AdminProtected = ({ currentUser, path, component: Component, passedProps}) => {
  return <Route
    path={path}
    render={props => (
      (currentUser && currentUser.isAdmin) ? <Component {...Object.assign({}, props, passedProps)} /> :
      <Redirect to='/'/>
    )}
  />
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const AdminProtectedRoute = withRouter(connect(mapStateToProps)(AdminProtected));
