import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
  // loggedIn: Boolean(state.session.id),
  currentUser: state.users[state.session.id],
  siteTemplate: state.siteTemplate
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

const TemplateProtected = ({ currentUser, path, name, siteTemplate, component: Component, passedProps}) => {
  debugger
  return <Route
    path={path}
    render={props => (
      (siteTemplate[name]) ? <Component {...Object.assign({}, props, passedProps)} /> :
      <Redirect to='/'/>
    )}
  />
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const AdminProtectedRoute = withRouter(connect(mapStateToProps)(AdminProtected));
export const TemplateProtectedRoute = withRouter(connect(mapStateToProps)(TemplateProtected));

// const Protected = ({ currentUser, path, component: Component}) => (
//   <Route
//     path={path}
//     render={props => (
//       currentUser ? <Component {...props} /> :
//       <Redirect to='/'/>
//     )}
//   />
// );
