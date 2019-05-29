import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Switch, Route, withRouter } from 'react-router-dom';

import HiringHome from './home.jsx'
import HiringDashboard from './dashboard.jsx'
import HiringShow from './show_posting.jsx'
import HiringCreate from './create/create_flow.jsx'

import { HiringAuthRoute,
  HiringProtectedRoute } from '../../util/route_util';

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

class HiringRouter extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div>
      <Switch>
        <HiringProtectedRoute path="/hiring/dashboard" component={HiringDashboard} />
        <HiringProtectedRoute path="/hiring/create" component={HiringCreate} />
        <Route path="/hiring/show" component={HiringShow} />
        <HiringAuthRoute path="/hiring" component={HiringHome} />
      </Switch>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringRouter));
