import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Switch, Route, withRouter } from 'react-router-dom';

import SalesHome from './home.jsx'
import SalesLandingPage from './landing_page.jsx'
import SalesDashboard from './dashboard.jsx'
import SalesLogin from './login.jsx'
import SalesConnectSocial from './connect_social.jsx'
import SalesRespondToIntro from './respond_to_intro.jsx'
import SalesStats from './stats.jsx'
import SalesAdminSignup from './admin_signup.jsx'

import { AuthRoute,
  SalesAuthRoute,
  SalesProtectedRoute,
} from '../../util/route_util';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class SalesRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div>
      <Switch>
        <SalesProtectedRoute path="/sales/dashboard" component={SalesDashboard} />
        <SalesProtectedRoute path="/sales/connect_social" component={SalesConnectSocial} />
        <Route path="/sales/respond_to_intro/:introId" component={SalesRespondToIntro} />
        <SalesProtectedRoute path="/sales/stats/:page?" component={SalesStats} />
        x
        <SalesAuthRoute path="/sales/admin_signup/:page" component={SalesAdminSignup} />
        <Route path="/sales/login" component={SalesLogin}/>
        <AuthRoute path="/sales" component={SalesLandingPage} />
      </Switch>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesRouter));
