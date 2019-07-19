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
import SalesExternalInvite from './network_invite/network_invite'

import { AuthRoute, ProtectedRoute } from '../../util/route_util';

import Loading from '../loading';
import NotFound from '../not_found';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { fetchUserNetworks, setCurrentNetwork } from '../../actions/sales_network_actions'

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  networkDetails: state.entities.sales.networkDetails
});

const mapDispatchToProps = dispatch => ({
  fetchUserNetworks: () => dispatch(fetchUserNetworks()),
  setCurrentNetwork: (networkId) => dispatch(setCurrentNetwork(networkId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class SalesRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.loadUserNetworks = this.loadUserNetworks.bind(this);
    // this.isActiveSub = this.isActiveSub.bind(this);
  }

  componentDidMount(){
    if(this.props.currentUser){
      this.loadUserNetworks()
    } else {
      this.setState({ loaded: true })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let thisCurrent = this.props.currentUser;
  //   let nextCurrent = nextProps.currentUser;
  
  //   if (nextCurrent && thisCurrent !== nextCurrent){
  //     this.loadUserNetworks()
  //   }
  //   return true
  // }

  loadUserNetworks() {
    this.props.fetchUserNetworks()
      .then(() => {
        this.setState({ loaded: true })
      })
  }

  render() {
    const { loaded } = this.state;
    const { dimensions } = this.props;
    if (loaded){
      return <div>
        <Switch>
          <ProtectedRoute path="/sales/dashboard" component={SalesDashboard} />
          <ProtectedRoute path="/sales/connect_social" component={SalesConnectSocial}/>
          <ProtectedRoute path="/sales/invite_external/:networkId" component={SalesExternalInvite}/>
          <Route path="/sales/respond_to_intro/:introId" component={SalesRespondToIntro} />
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
