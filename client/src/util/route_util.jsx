import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';

import { addUserByReferral } from '../actions/member_users_actions';

const mapStateToProps = state => ({
  // loggedIn: Boolean(state.session.id),
  currentUser: state.users[state.session.id],
  siteTemplate: state.siteTemplate
});

const mapDispatchToProps = dispatch => ({
  addUserByReferral: (referralCode, userId) => dispatch(addUserByReferral(referralCode, userId)),
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

const HiringAuth = ({ currentUser, path, component: Component}) => (
  <Route
    path={path}
    render={props => (
      currentUser ? <Redirect to="/hiring/dashboard" /> :
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

const HiringProtected = ({ currentUser, path, component: Component, passedProps}) => {
  return <Route
    path={path}
    render={props => (
      currentUser ? <Component {...Object.assign({}, props, passedProps)} /> :
      <Redirect to='/hiring'/>
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
  return <Route
    path={path}
    render={props => (
      (siteTemplate[name]) ? <Component {...Object.assign({}, props, passedProps)} /> :
      <Redirect to='/'/>
    )}
  />
};

const ReferralProtected = ({ currentUser, path, name, siteTemplate,
  component: Component, passedProps, addUserByReferral}) => {
  return <Route
    path={path}
    render={props => {
      if (currentUser){
        let referralCode = window.location.pathname.split('/').pop();
        addUserByReferral(referralCode, currentUser.id)
      }
      return currentUser ? <Redirect to="/findandconnect" /> :
      <Component {...Object.assign({}, props, passedProps)} />
    }}
  />
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const HiringAuthRoute = withRouter(connect(mapStateToProps)(HiringAuth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const HiringProtectedRoute = withRouter(connect(mapStateToProps)(HiringProtected));

export const AdminProtectedRoute = withRouter(connect(mapStateToProps)(AdminProtected));
export const TemplateProtectedRoute = withRouter(connect(mapStateToProps)(TemplateProtected));
export const ReferralProtectedRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(ReferralProtected));

// const Protected = ({ currentUser, path, component: Component}) => (
//   <Route
//     path={path}
//     render={props => (
//       currentUser ? <Component {...props} /> :
//       <Redirect to='/'/>
//     )}
//   />
// );
