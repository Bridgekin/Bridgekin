import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from 'react-router-dom';
import { ProtectedRoute} from '../../util/route_util';
// import { Link, NavLink, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {
  fetchConnections, updateConnection, deleteConnection
} from '../../actions/connection_actions';

import FeedContainer from '../feed_container';
import FeedCard from '../feed_card';
import FilterCard from '../filter_card';
import Loading from '../loading';
import OpportunityWaitlist from '../opportunity/opportunity_waitlist';
import Contacts from './contacts';
import ProfilePage from './profile_page';
import SearchResults from './search_results';
import ContactsPage from './contacts_page';
// import Invitations from './invitations';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.connections,
  searchResultsPage: state.entities.searchResultsPage,
});

const mapDispatchToProps = dispatch => ({
  fetchConnections: () => dispatch(fetchConnections()),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: (id) => dispatch(deleteConnection(id)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  loading:{
    position: 'relative',
    top: 200
  },
  filterCard:{
    // marginTop: 18,
    backgroundColor: theme.palette.base3,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.primary}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  filterHeader:{
    fontSize: 13,
    fontWeight: 500
  },
  buttonText: { color: theme.palette.text.primary },
  mobileWaitlist: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  }
})

class MyTrustedNetwork extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    this.props.fetchConnections()
    .then(() => this.setState({ loaded: true }))
  }

  render(){
    const{ classes, currentUser, searchResultsPage } = this.props;
    const { loaded } = this.state;
    const pathName = this.props.location.pathname;

    if (loaded){
      let waitlistCard = (
        <FeedCard contents={
            <div>
              <Typography gutterBottom align='Left'
                className={classes.cardHeader} color='textSecondary'
                style={{ marginBottom: 20}}>
                Invite your trusted business contacts
              </Typography>
              <OpportunityWaitlist
                currentUser={currentUser} />
            </div>
          }/>
      )

      let pages = [
        {title: `My Contacts`, dest: '/mynetwork'},
        {title: 'Invitations', dest: '/mynetwork/invitations'},
        {title: 'Invitations Sent', dest: '/mynetwork/pending'},
        // {title: 'Invitations Sent', dest: '/mynetwork/profile/:id'},
        // {title: 'Invitations Sent', dest: '/mynetwork/pending'},
      ]

      let filter = (
        <FilterCard
          title={`My Trusted Network`}
          pages={pages}
          mobile={false}
          />
      )

      let feed = (
        <div>
          <Switch>
            <ProtectedRoute path="/mynetwork/profile/:userId" component={ProfilePage} />
            <ProtectedRoute path="/mynetwork/searchresults/:input" component={SearchResults} />
            <ProtectedRoute
              path="/mynetwork"
              component={ContactsPage}
              passedProps={{ waitlistCard, pages }} />
          </Switch>
        </div>
      )

      return (
        <FeedContainer
          column1={(!pathName.includes('search') || searchResultsPage.length > 0)
            && waitlistCard}
          feed={feed}
          column2={filter}
          />
      )
    } else {
      return <div className={classes.loading}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyTrustedNetwork));

// <Switch>
//   <ProtectedRoute path="/mynetwork/invitations" component={Invitations} />
//   <ProtectedRoute path="/mynetwork" component={Contacts} />
// </Switch>
