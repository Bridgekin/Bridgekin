import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute} from '../util/route_util';
import './App.css';

// import NavBar from './components/nav/nav_bar';
import HomeNav from './components/nav/home_nav';
import HomePage from './components/home/home_page';
import AccountHome from './components/account/account_home';

export default () => (
  <div>
    <Switch>
      <Route path="/" component={HomeNav} />
    </Switch>

    <Switch>
      <Route path="/account" component={AccountHome} />
      <Route path="/" component={HomePage} />
    </Switch>
  </div>
);
