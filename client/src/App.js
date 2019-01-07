import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from './util/route_util';
import './App.css';

import HomeNav from './components/nav/home_nav';
import HomePage from './components/home/home_page';
import AccountRoute from './components/account/account_route';
import OpportunityHome from './components/opportunity/opportunity_home';
import OpportunityCreate from './components/post_opportunity/opportunity_create';
import SignupPage from './components/home/signup_page';

import { getAuthUserId } from './util/session_api_util';
import { receiveCurrentUser } from './actions/session_actions';
// import { connect } from 'react-redux';

export default () => (
  <div>
    <Route path="/" component={HomeNav} />

    <Switch>
      <ProtectedRoute path="/findandconnect" component={OpportunityHome} />
      <ProtectedRoute path="/postopportunity" component={OpportunityCreate} />
      <ProtectedRoute path="/account" component={AccountRoute} />
      <Route path="/signup/:code" component={SignupPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </div>
);

// class App extends Component {
//   componentDidMount(){
//     let token = localStorage.getItem('bridgekinToken');
//
//     if (token){
//       getAuthUserId(token)
//       .then(data => {
//         this.props.receiveCurrentUser(data.user);
//       })
//     }
//   }
//
//   render(){
//     console.log('loggedin?', Boolean(this.props.loggedIn));
//
//     return (
//       <div>
//         <Route path="/" component={HomeNav} />
//
//         <Switch>
//           <ProtectedRoute path="/findandconnect" component={OpportunityHome} />
//           <ProtectedRoute path="/postopportunity" component={OpportunityCreate} />
//           <ProtectedRoute path="/account" component={AccountHome} />
//           <Route path="/" component={HomePage} />
//         </Switch>
//       </div>
//     )
//   }
// };
//
// const mapStateToProps = state => ({
//   currentUser: state.users[state.session.id],
//   loggedIn: Boolean(state.session.id)
// });
//
// const mapDispatchToProps = dispatch => ({
//   receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user))
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
