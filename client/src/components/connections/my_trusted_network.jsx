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
// import Contacts from './contacts';
import ProfilePage from './profile_page';
import SearchResults from './search_results';
import ContactsPage from './contacts_page';
import CirclesPage from './circles_page';

// import FilterBarButton from './filter_bar_button';
// import Invitations from './invitations';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  // connections: state.connections,
  searchResultsPage: state.entities.searchResultsPage,
  connections: state.entities.connections
});

const mapDispatchToProps = dispatch => ({
  // fetchConnections: () => dispatch(fetchConnections()),
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
    // width: '100%',
    // borderRadius: 5,
    border: `1px solid ${theme.palette.border.secondary}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  filterHeader:{
    fontSize: 12,
    fontWeight: 500
  },
  buttonText: { color: theme.palette.text.primary },
  mobileWaitlist: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  mobileAdjustFeed:{
    paddingTop: 45,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0
    },
  },
  cardHeader:{
    fontSize: 13,
    fontWeight: 600
  },
  filterBar: {
    flexGrow: 1,
    backgroundColor: "rgb(255,255,255,0.8)",
    height: 45,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    position: 'fixed',
    top: 45,
    zIndex: 1,
    padding: "0px 5px",
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  filterButton:{
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black',
    margin: '0px 4px',
    padding: "3px 5px",
    textTransform: 'capitalize',
  },
})

class MyTrustedNetwork extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      mobileNavAnchorEl: null
    }
    // this.handleMobileNavClick = this.handleMobileNavClick.bind(this);
    this.countFilter = this.countFilter.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }

  componentDidMount(){
    // this.props.fetchConnections()
    this.props.fetchCircles()
    .then(() => {
      this.setState({ loaded: true })
    })
  }

  // handleMobileNavClick(path){
  //   return e => {
  //     const { mobileNavAnchorEl } = this.state;
  //     this.setState({ mobileNavAnchorEl: mobileNavAnchorEl ? null : e.currentTarget },
  //     () => {
  //       if(path){
  //         this.props.history.push(path)
  //       }
  //     })
  //   }
  // }

  handleChoice(optionUrl){
    return e => {
      this.setState({ mobileNavAnchorEl: null },
      () => this.props.history.push(optionUrl));
    }
  }

  menuToggle(e){
    const { mobileNavAnchorEl } = this.state;
    this.setState({ mobileNavAnchorEl: mobileNavAnchorEl ? null : e.currentTarget})
  }

  countFilter(dest){
    const { connections, currentUser } = this.props;
    // const pathName = this.props.location.pathname;
    let length = 0
    switch (dest) {
      case '/mynetwork/invitations':
        length = Object.values(connections).filter(x => (
          x.status === 'Pending' && x.friendId === currentUser.id))
          .length
        if (length > 0){
          return ` (${length})`
        }
        return '';
      default:
        return '';
    }
  }

  render(){
    const{ classes, currentUser, searchResultsPage,
      history, location} = this.props;
    const { loaded, mobileNavAnchorEl } = this.state;
    const pathName = this.props.location.pathname;

    if (loaded){
      let waitlistCard = (
        <FeedCard contents={
          <div>
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

      let focusedPage = pages.find(x => x.dest === pathName)

      // let pages = {
      //   '/mynetwork': `My Contacts`,
      //   '/mynetwork/invitations': 'Invitations',
      //   '/mynetwork/pending': 'Invitations Sent',
      //   '/mynetwork/circles': 'Network Circles'
      // }

      let filter = (
        <div className={classes.filterCard}>
          <Typography align='left' color="textPrimary"
            className={classes.cardHeader}
            style={{ margin: "10px 15px 0px"}}>
            {`My Trusted Network`}
          </Typography>

          <List component="nav">
            {pages.map(page => (
              <ListItem button className={classes.filterItem}
                onClick={() => history.push(page.dest)}
                selected={location.pathname === page.dest}>
                <Typography variant="body1" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {page.title}
                  {`${this.countFilter(page.dest)}`}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      )

      let mobileFilterBar = (
        <Grid container className={classes.filterBar}
          justify='flex-end' alignItems='center'>
          <Button
            onClick={this.menuToggle}
            className={classes.filterButton}>
            {focusedPage && focusedPage.title}
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl= {mobileNavAnchorEl}
            open={Boolean(mobileNavAnchorEl)}
            onClose={this.menuToggle}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            MenuListProps={{
              classes:{
                root: classes.menu
              }
            }}
            getContentAnchorEl={null}
            >
            {pages.map(page => (
              <MenuItem className={classes.menuItem}
                onClick={this.handleChoice(page.dest)}>
                <Typography variant='body1' color='textPrimary'
                  style={{ textTransform: 'capitalize', fontSize: 13}}>
                  {page.title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      )

      let feed = (
        <div className={classes.mobileAdjustFeed}>
          {mobileFilterBar}
          <Switch>
            <ProtectedRoute path="/mynetwork/searchresults/:input" component={SearchResults} />
            <ProtectedRoute
              path="/mynetwork/profile/:userId"
              component={ProfilePage}
              passedProps={{ waitlistCard }} />
            <ProtectedRoute
              path="/mynetwork/circles"
              component={CirclesPage}
              passedProps={{ waitlistCard }} />
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
