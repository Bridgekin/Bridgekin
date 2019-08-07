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
import SalesInvite from './invite/invite'
import SalesPermissionConfirmed from './permission_confirmed'

import { AuthRoute, ProtectedRoute } from '../../util/route_util';

import Loading from '../loading';
import NotFound from '../not_found';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  networkDetails: state.entities.sales.networkDetails
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
    this.state = { loaded: false }
  }

  componentDidMount(){
    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state;
    const { dimensions } = this.props;
    if (loaded){
      return <div>
        <Switch>
          <ProtectedRoute path="/sales/dashboard" component={SalesDashboard} />
          <ProtectedRoute path="/sales/connect_social" component={SalesConnectSocial}/>
          <ProtectedRoute path="/sales/invite" component={SalesInvite}/>
          <Route path="/sales/respond_to_intro/:introId" component={SalesRespondToIntro} />
          <Route path="/sales/permission_confirmed" component={SalesPermissionConfirmed} />
          <ProtectedRoute path="/sales/stats/:page?" component={SalesStats} />
          <Route path="/sales/admin_signup/:page" 
            render={(props) => <SalesAdminSignup {...props} loadUserNetworks={this.loadUserNetworks} />}/>
          {/* SalesLogin should stay a normal routes so that we don't load the next pages too quickly - think componentDidMount on Dashboard */}
          <Route path="/sales/login/:page?"
            render={(props) => <SalesLogin {...props} loadUserNetworks={this.loadUserNetworks} />} />
          <AuthRoute path="/sales" component={SalesLandingPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    } else {
      return <Grid container justify='center'
        alignItems='center' style={{ minHeight: dimensions.height }}>
        <Loading />
      </Grid>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesRouter));
