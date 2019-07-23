import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { AuthRoute,
  ProtectedRoute,
  AdminProtectedRoute,
  TemplateProtectedRoute,
  SalesAuthRoute } from './util/route_util';
import './App.css';

import Footer from './components/nav/footer';
import AccountConfirmed from './components/account/account_confirmed';
import PasswordReset from './components/home/password_reset';
import PasswordUpdate from './components/home/password_update';

import UserAgreement from './components/terms/user_agreement';
import PrivacyPolicy from './components/terms/privacy_policy';
import MasterServiceAgreement from './components/terms/master_service_agreement';

import NotFound from './components/not_found';
import ConfirmationError from './components/confirmation_error';
import ScrollToTop from './components/scroll_to_top';

import ImportContacts from './components/google/import_contacts';

import SalesRouter from './components/sales/sales_router.jsx'
import SalesNav from './components/sales/nav.jsx'
import SalesLandingPage from './components/sales/landing_page.jsx'

export default ()=> (
  <div>
    <ScrollToTop />

    <Switch>
      <Route path="/" component={SalesNav} />
    </Switch>

    {/* General Modals */}
    <Switch>
      <Route path="/sales" component={SalesRouter} />
      <AuthRoute exact path="/" component={SalesLandingPage} />

      <AuthRoute path="/accountconfirmed" component={AccountConfirmed} />
      {/* <AuthRoute path="/login" component={Login}/> */}
      <AuthRoute path="/passwordreset" component={PasswordReset}/>
      <AuthRoute path="/passwordupdate/:resetToken" component={PasswordUpdate}/>
      <AuthRoute path="/confirmationerror" component={ConfirmationError}/>


      <Route path="/useragreement" component={UserAgreement} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/masterserviceagreement" component={MasterServiceAgreement} />
    
      <Route component={NotFound} />
    </Switch>

    {/* Footer */}
    <Route path="/" component={Footer} />
  </div>
)

// export default connect(mapStateToProps, {})(withRouter(App))

// shouldComponentUpdate(nextProps, nextState){
//   window.scrollTo(0, 0);
//   return false
// }

// componendDidUpdate(){
//   debugger
// }

// style={{ width: `${window.height}`}}
// style={{ height: window.innerHeight }}


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
