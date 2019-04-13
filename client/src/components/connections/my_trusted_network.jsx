import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Switch, withRouter } from 'react-router-dom';
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
import { fetchCircles } from '../../actions/circle_actions';

import FeedContainer from '../feed_container';
import FeedCard from '../feed_card';
import FilterCard from '../filter_card';
import Loading from '../loading';
import OpportunityWaitlist from '../opportunity/opportunity_waitlist';
import Contacts from './contacts';
import ProfilePage from './profile_page';
import SearchResults from './search_results';
import ContactsPage from './contacts_page';
import CirclesPage from './circles_page';
// import Invitations from './invitations';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  // connections: state.connections,
  searchResultsPage: state.entities.searchResultsPage,
});

const mapDispatchToProps = dispatch => ({
  fetchConnections: () => dispatch(fetchConnections()),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: (id) => dispatch(deleteConnection(id)),
  fetchCircles: () => dispatch(fetchCircles()),
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
  },
  cardHeader:{
    fontSize: 16
  }
})

class MyTrustedNetwork extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      mobileNavAnchorEl: null
    }
    this.handleMobileNavClick = this.handleMobileNavClick.bind(this);
  }

  componentDidMount(){
    // this.props.fetchConnections()
    this.props.fetchCircles()
    .then(() => {
      this.setState({ loaded: true })
    })
  }

  handleMobileNavClick(path){
    return e => {
      const { mobileNavAnchorEl } = this.state;
      this.setState({ mobileNavAnchorEl: mobileNavAnchorEl ? null : e.currentTarget },
      () => {
        if(path){
          this.props.history.push(path)
        }
      })
    }
  }

  render(){
    const{ classes, currentUser, searchResultsPage } = this.props;
    const { loaded, mobileNavAnchorEl } = this.state;
    const pathName = this.props.location.pathname;

    if (loaded){
      let waitlistCard = (
        <FeedCard contents={
          <div>
            <Typography gutterBottom align='left'
              className={classes.cardHeader} color='textPrimary'
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
        {title: 'Network Circles', dest: '/mynetwork/circles'},
        // {title: 'Invitations Sent', dest: '/mynetwork/pending'},
      ]

      let filter = (
        <FilterCard
          title={`My Trusted Network`}
          pages={pages}
          mobile={false}
          />
      )

      // let mobileNavigation = (
      //   <Grid container justify='flex-start' alignItems='center'
      //     className={classes.mobileNavigation}>
      //     <Typography align='left' color="textPrimary"
      //       className={classes.mobileNavHeader}>
      //       My Trusted Network
      //       <IconButton
      //         onClick={this.handleMobileNavClick()}
      //         classes={{ label: classes.moreIcon }}
      //         style={{ padding: 6}}
      //         >
      //         <MoreVertIcon />
      //       </IconButton>
      //     </Typography>
      //
      //     <Menu
      //       id="long-menu"
      //       anchorEl={mobileNavAnchorEl}
      //       open={Boolean(mobileNavAnchorEl)}
      //       onClose={this.handleMobileNavClick()}
      //     >
      //       {pages.map(item => (
      //         <ListItem button className={classes.filterItem}
      //           onClick={this.handleMobileNavClick(item.dest)}
      //           selected={pathName === item.dest}>
      //           <Typography variant="body1" align='left'
      //             color="textPrimary" className={classes.filterHeader}>
      //             {item.title}
      //           </Typography>
      //         </ListItem>
      //       ))}
      //     </Menu>
      //   </Grid>
      // )

      let feed = (
        <div>
          <Switch>
            <ProtectedRoute path="/mynetwork/searchresults/:input" component={SearchResults} />
            <ProtectedRoute
              path="/mynetwork/profile/:userId"
              component={ProfilePage}
              passedProps={{ waitlistCard }} />
            <ProtectedRoute
              path="/mynetwork/circles"
              component={CirclesPage}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(MyTrustedNetwork)));

// <Switch>
//   <ProtectedRoute path="/mynetwork/invitations" component={Invitations} />
//   <ProtectedRoute path="/mynetwork" component={Contacts} />
// </Switch>
