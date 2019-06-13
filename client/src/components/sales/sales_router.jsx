import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Switch, Route, withRouter } from 'react-router-dom';

import SalesHome from './home.jsx'
import SalesLandingPage from './landing_page.jsx'
import SalesDashboard from './dashboard.jsx'
import SalesLogin from './login.jsx'
import SalesConnectSocial from './connect_social.jsx'
// import SalesShow from './show_posting.jsx'
// import SalesCreate from './create/create_flow.jsx'
// import SalesSharing from './share_posting.jsx'

import {
  SalesAuthRoute,
  SalesProtectedRoute
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
        {/* <SalesProtectedRoute path="/sales/create" component={SalesCreate} />
        <SalesProtectedRoute path="/sales/share/:id" component={SalesSharing} />
        <Route path="/sales/show/:id?" component={SalesShow} />*/}
        <Route path="/sales/login" component={SalesLogin}/>
        <Route path="/sales" component={SalesLandingPage} />
      </Switch>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesRouter));
