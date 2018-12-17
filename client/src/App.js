import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute} from '../util/route_util';
import './App.css';

import NavBar from './components/nav/nav_bar';
import HomePageContainer from './components/home/home_page_container';

export default () => (
  <div>
    <NavBar />
    <Switch>
        <Route path="/" component={HomePageContainer} />
    </Switch>
  </div>
);
