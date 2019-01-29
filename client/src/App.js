import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from './util/route_util';
import './App.css';

import HomeNav from './components/nav/home_nav';
import Footer from './components/nav/footer';

import HomePage from './components/home/home_page';
import AccountRoute from './components/account/account_route';
import OpportunityHome from './components/opportunity/opportunity_home';
import OpportunityCreate from './components/post_opportunity/opportunity_create';
import OpportunityEdit from './components/post_opportunity/opportunity_edit';
import SignupPage from './components/home/signup_page';
import AccountConfirmed from './components/account/account_confirmed';
import ConnectionsHome from './components/connections/connections_home';
import Login from './components/home/login_page';
import PasswordReset from './components/home/password_reset';
import PasswordUpdate from './components/home/password_update';
// import ConnectionsHome from './components/wip';

import UserAgreement from './components/terms/user_agreement';
import PrivacyPolicy from './components/terms/privacy_policy';

import NotFound from './components/not_found';
import ConfirmationError from './components/confirmation_error';
import ScrollToTop from './components/scroll_to_top';

// export default () => (
class App extends React.Component {
  // shouldComponentUpdate(nextProps, nextState){
  //   window.scrollTo(0, 0);
  //   return false
  // }

  // componendDidUpdate(){
  //   debugger
  // }

  // style={{ width: `${window.height}`}}
  render(){
    return (
      <div>
        <ScrollToTop />
        <Route path="/" component={HomeNav} />

        <Switch>
          <ProtectedRoute path="/findandconnect" component={OpportunityHome} />
          <ProtectedRoute path="/postopportunity" component={OpportunityCreate} />
          <ProtectedRoute path="/editopportunity/:id" component={OpportunityEdit} />
          <ProtectedRoute path="/account" component={AccountRoute} />
          <ProtectedRoute path="/mynetwork" component={ConnectionsHome} />
          <AuthRoute path="/signup/:code" component={SignupPage} />
          <AuthRoute path="/accountconfirmed" component={AccountConfirmed} />
          <AuthRoute path="/login" component={Login}/>
          <AuthRoute path="/passwordreset" component={PasswordReset}/>
          <AuthRoute path="/passwordupdate/:resetToken" component={PasswordUpdate}/>
          <AuthRoute exact path="/" component={HomePage} />
          <AuthRoute path="/confirmationerror" component={ConfirmationError}/>
          <Route path="/useragreement" component={UserAgreement} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>

        <Route path="/" component={Footer} />
      </div>
    )
  }
};

export default App;
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
