import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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

import { fetchManagedNetworks } from '../../actions/network_admin_actions';
import { fetchMemberUsers,
  addMemberUser, removeMemberUser} from '../../actions/member_users_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import FeedContainer from '../feed_container';
import NetworkLinkGenerator from './network_link_generator';
import MemberCard from './member_card';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  managedNetworks: state.entities.managedNetworks,
  memberUserIds: state.entities.memberUsers,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  fetchManagedNetworks: () => dispatch(fetchManagedNetworks()),
  fetchMemberUsers: (networkId) => dispatch(fetchMemberUsers(networkId)),
  addMemberUser: (networkId, userId) => dispatch(addMemberUser(networkId, userId)),
  removeMemberUser: (networkId, userId) => dispatch(removeMemberUser(networkId, userId))
});

const styles = {
  root: {
    flexGrow: 1,
  },
  feedCard:{
    // height: 118,
    padding: "9px 8px 9px 8px",
    backgroundColor: `${theme.palette.white}`,
    // borderTop: `1px solid ${theme.palette.lightGrey}`,
    border: `1px solid ${theme.palette.lightGrey}`,
    // width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 5,
      padding: "9px 17px 9px",
    }
  },
  cardHeader:{
    fontSize: 14,
    fontWeight: 600
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey1}`,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.darkGrey,
    top: 0, right: 0
  },
  inputRoot: {
    color: theme.palette.darkGrey,
    width: '100%',
    fontSize: 15,
    fontWeight: 500,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sortBy: { fontSize: 14, fontWeight: 400, marginRight: 6}
};

class NetworkAdmin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      currentNetworkId: null,
      networkAnchorEl: null,
      userSortAnchorEl: null,
      userSortSetting: 'Recently Added'
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleChooseNetwork = this.handleChooseNetwork.bind(this);
  }

  componentDidMount(){
    this.props.fetchManagedNetworks()
    .then(() => {
      let firstNetwork = Object.values(this.props.managedNetworks)[0]
      this.props.fetchMemberUsers(firstNetwork.id)
      .then(() => this.setState({
        loaded: true,
        currentNetworkId: firstNetwork.id
      }))
    })
  }

  handleChooseNetwork(currentNetworkId){
    return e => {
      this.setState({ loading: false, currentNetworkId },
        () => {
          this.props.fetchMemberUsers(currentNetworkId)
          .then(() => this.setState({
            loaded: true,
            networkAnchorEl: null
          }))
        })
    }
  }

  handleMenuOpen(menuAnchor){
    return e => {
      e.preventDefault();
      this.setState({ [menuAnchor]: e.currentTarget})
    }
  }

  handleMenuClose(menuAnchor){
    return e => {
      e.preventDefault();
      this.setState({ [menuAnchor]: null })
    }
  }

  userSortChange(option){
    return e => {
      this.setState({ userSortSetting: option, userSortAnchorEl: null })
    }
  }

  render () {
    const { classes, managedNetworks, memberUserIds,
      users } = this.props;
    const { loaded, networkAnchorEl, currentNetworkId,
    userSortAnchorEl, userSortSetting } = this.state;

    if (loaded) {
      const memberUsers = [...memberUserIds].map(id => users[id]);

      let column1 = (
        <div style={{ paddingTop: 18}}>
          <div className={classes.feedCard}>
            <Button
              aria-owns={networkAnchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuOpen('networkAnchorEl')}
            >
              {managedNetworks[currentNetworkId].title || `No Network Chosen`}
              <KeyboardArrowDownIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={networkAnchorEl}
              open={Boolean(networkAnchorEl)}
              onClose={this.handleMenuClose('networkAnchorEl')}
            >
              {Object.values(managedNetworks).map(workspace => (
                <MenuItem onClick={this.handleChooseNetwork(workspace.id)}>
                  {workspace.title}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div className={classes.feedCard}>
            <Typography variant="body1" align="left"
              className={classes.cardHeader}>
              Add A New Member
            </Typography>
            <NetworkLinkGenerator
              currentNetworkId={currentNetworkId}
              />
          </div>
        </div>
      )

      let userSortOptions = ['Recently Added', 'First Name', 'Last Name'];

      let sortedUsers = memberUsers.map(user => (
        <div className={classes.feedCard}>
          <MemberCard
            user={user}
            networkId={currentNetworkId}
            />
        </div>
      ))

      let feed = (
        <div style={{ paddingTop: 18, width: '100%'}}>
          <Grid container justify='space-between'
            className={classes.feedCard}>
            <Grid item xs={12} sm={5}>
              <Button color="primary" classes={{ label: classes.label}}
                style={{ paddingLeft: 0, textTransform: 'capitalize'}}
                aria-owns={userSortAnchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuOpen('userSortAnchorEl')}
                >
                <Typography align='Left' className={classes.sortBy}>
                  {`Sort by:`}
                </Typography>
                {userSortSetting}
                <KeyboardArrowDownIcon style={{ fontSize: 20}}/>
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={userSortAnchorEl}
                open={Boolean(userSortAnchorEl)}
                onClose={this.handleMenuClose('userSortAnchorEl')}
                >
                {userSortOptions.map(option => (
                  <MenuItem onClick={this.userSortChange(option)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>


            <Grid item sm={7}
              className={classes.search}>
              <InputBase
                placeholder="Search by name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </Grid>
          </Grid>

          {sortedUsers}
        </div>
      )
      let filter = <div></div>

      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <FeedContainer
            column1={column1}
            feed={feed}
            column2={filter}
            />
        </MuiThemeProvider>
      )
    } else {
      return <div> Loading </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NetworkAdmin));


// <Grid item sm={6} container justify='center'>
//   <Typography variant="h2" align='left' color="textPrimary" >
//     Manage your networks
//   </Typography>
// </Grid>
//
// <Grid item sm={3} container justify='center'
//   flexDirection='column'>
//   <Typography variant="body1" align='left' color="textPrimary" >
//     Choose a network
//   </Typography>
//   <Select
//     value={this.state.defaultNetworkId}
//     onChange={this.handleDefaultWorkspaceChange}
//     inputProps={{
//       name: 'defaultNetworkId',
//       id: 'defaultNetworkId-simple',
//     }}
//     renderValue={selected => managedNetworks[selected].title}
//   >
//     {Object.values(managedNetworks).map(workspace => (
//       <MenuItem value={workspace.id}>
//         {workspace.title}
//       </MenuItem>
//     ))}
//   </Select>
// </Grid>
