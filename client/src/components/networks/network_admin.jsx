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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { fetchManagedNetworks } from '../../actions/network_admin_actions';
import { fetchMemberUsers,
  addMemberUser, removeMemberUser} from '../../actions/member_users_actions';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../theme';
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

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  feedCard:{
    padding: "9px 8px 9px 8px",
    backgroundColor: theme.palette.base3,
    borderTop: `1px solid ${theme.palette.border.primary}`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.primary}`,
      marginBottom: 9,
      borderRadius: 5,
      padding: "9px 17px 9px",
    }
  },
  mobileFeedCard:{
    padding: "9px 8px 9px 8px",
    backgroundColor: `${theme.palette.base3}`,
    // borderTop: `1px solid ${theme.palette.border.primary}`,
    border: `1px solid ${theme.palette.border.primary}`,
    // width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  cardHeader:{
    fontSize: 14,
    fontWeight: 600
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border.secondary}`,
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
    color: theme.palette.text.secondary,
    top: 0, right: 0
  },
  inputRoot: {
    color: theme.palette.text.secondary,
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
  sortBy: { fontSize: 14, fontWeight: 400, marginRight: 6},
  filter:{
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    padding: 0,
    width: '100%'
  },
  filterCard:{
    // marginTop: 18,
    backgroundColor: `${theme.palette.base3}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.primary}`
  },
  filterHeader:{ fontSize: 14, fontWeight: 600 },
  filterItem: { fontSize: 14, fontWeight: 400 },
  listSelected: { backgroundColor: '#E5DBDB'},
  buttonText: { color: theme.palette.text.primary },
});

class NetworkAdmin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      currentNetworkId: null,
      networkAnchorEl: null,
      userSortAnchorEl: null,
      searchInput: '',
      userSortSetting: 'Recently Added'
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleChooseNetwork = this.handleChooseNetwork.bind(this);
    this.sortUsers = this.sortUsers.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  handleSearchChange(e){
    this.setState({ searchInput: e.target.value })
  }

  sortUsers(users){
    const { userSortSetting, searchInput } = this.state;

    if (searchInput !== ''){
      return [...users].filter(user => (
        user.fname.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.lname.toLowerCase().includes(searchInput.toLowerCase())
      ))
    }

    switch (userSortSetting){
      case 'First Name':
        return [...users].sort((a, b) => {
          let userAFName = a.fname.toUpperCase();
          let userBFName = b.fname.toUpperCase();
          if(userAFName > userBFName){ return 1 }
          else { return -1 }
        })
      case 'Last Name':
        return [...users].sort((a, b) => {
          let userALName = a.lname.toUpperCase();
          let userBLName = b.lname.toUpperCase();
          if(userALName > userBLName){ return 1 }
          else { return -1 }
        })
      default:
        return users;
    }
  }

  render () {
    const { classes, managedNetworks, memberUserIds,
      users } = this.props;
    const { loaded, networkAnchorEl, currentNetworkId,
    userSortAnchorEl, userSortSetting } = this.state;

    if (loaded) {
      const memberUsers = [...memberUserIds].map(id => users[id]);

      let networkFilter = (
        <div>
          <Button
            aria-owns={networkAnchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            classes={{ label: classes.buttonText}}
            onClick={this.handleMenuOpen('networkAnchorEl')}
            style={{ textTransform: 'capitalize'}}
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
      )

      let referralGenerator = (
        <div>
          <Typography variant="body1" align="left"
            className={classes.cardHeader}>
            Add A New Member
          </Typography>
          <NetworkLinkGenerator
            currentNetworkId={currentNetworkId}
            />
        </div>
      )

      let column1 = (
        <div>
          <div className={classes.feedCard}>
            {networkFilter}
          </div>
          <div className={classes.feedCard}>
            {referralGenerator}
          </div>
        </div>
      )

      let filter = (
        <Grid container justify='center' alignItems='center'
          className={classes.filter}>
          <div className={classes.filterCard}>
            <List component="nav" style={{ padding: 0}}>
              <ListItem button className={classes.filterItem}>
                <Typography variant="body1" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {'Community Details'}
                </Typography>
              </ListItem>
              <ListItem button className={classes.filterItem}
                selected>
                <Typography variant="body1" align='left'
                  color="textPrimary" className={classes.filterItem}>
                  {`Our Contacts (${memberUserIds.size})`}
                </Typography>
              </ListItem>
            </List>
          </div>
        </Grid>
      )

      let userSortOptions = ['Recently Added', 'First Name', 'Last Name'];

      let search = (
        <Grid item sm={7}
          className={classes.search}>
          <InputBase
            placeholder="Search by name"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={this.handleSearchChange}
          />
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
        </Grid>
      )

      let feed = (
        <div style={{ paddingBottom:30, width: '100%'}}>
          <Grid container justify='space-between' alignItems='center'
            className={classes.mobileFeedCard}>
            {networkFilter}
            <Typography variant="body1" align='left'
              color="textPrimary" className={classes.filterItem}>
              {`Our Contacts (${memberUserIds.size})`}
            </Typography>
          </Grid>
          <Grid container justify='space-between'
            className={classes.feedCard}>
            <Grid item xs={12} sm={5}>
              <Button color="primary"
                style={{ paddingLeft: 0, textTransform: 'capitalize'}}
                aria-owns={userSortAnchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                classes={{ label: classes.buttonText }}
                onClick={this.handleMenuOpen('userSortAnchorEl')}
                >
                <Typography align='left' className={classes.sortBy}>
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
            {search}
          </Grid>

          {this.sortUsers(memberUsers).map(user => (
            <div className={classes.feedCard}>
              <MemberCard
                user={user}
                networkId={currentNetworkId}
                />
            </div>
          ))}

          <Grid container justify='space-between' alignItems='center'
            className={classes.mobileFeedCard}
            style={{ marginTop: 9}}>
            {referralGenerator}
          </Grid>
        </div>
      )

      return (
        <div className={classes.root}>
          <FeedContainer
            column1={column1}
            feed={feed}
            column2={filter}
            />
        </div>
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
//   direction='column'>
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
