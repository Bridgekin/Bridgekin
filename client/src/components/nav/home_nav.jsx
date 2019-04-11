import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image';
import PersonIcon from '@material-ui/icons/Person';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

// import logo from '../../static/castle.jpg';
import logo from '../../static/Bridgekin_Logo.png';
import whiteLogo from '../../static/bridgekin_white.png';
import whiteLogoMobile from '../../static/white_mobile.png';
import logoMobile from '../../static/apple-touch-icon.png';
import LoginModal from './login_modal';
import SearchBar from './search_bar';

import { login, logout } from '../../actions/session_actions';
import { getAuthUserId } from '../../util/session_api_util';
import { receiveCurrentUser } from '../../actions/session_actions';
import { receiveUser } from '../../actions/user_actions';
import { fetchSiteTemplate } from '../../actions/site_template_actions';
import { addUserByReferral } from '../../actions/member_users_actions';
import { handleAuthErrors } from '../../actions/fetch_error_handler';
import { fetchSearchResults } from '../../actions/user_actions';

import { fetchNotifications, updateAsRead } from '../../actions/notification_actions';
// import timeBetweenDates from 'time-between-dates';
import datetimeDifference from "datetime-difference";

const mapStateToProps = (state, ownProps) => {
  const siteTemplate = state.siteTemplate;
  return ({
    currentUser: state.users[state.session.id],
    session: state.session.id,
    sessionErrors: state.errors.login,
    workspaces: Object.values(state.workspaces),
    searchResults: state.entities.searchResults,
    users: state.users,
    siteTemplate,
    notifications: state.entities.notifications
  })
};

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
  receiveUser: (user) => dispatch(receiveUser(user)),
  fetchSiteTemplate: (networkId) => dispatch(fetchSiteTemplate(networkId)),
  addUserByReferral: (referralCode, userId) => dispatch(addUserByReferral(referralCode, userId)),
  fetchSearchResults: (searchInput) => dispatch(fetchSearchResults(searchInput)),
  fetchNotifications: () => dispatch(fetchNotifications()),
  updateAsRead: (ids) => dispatch(updateAsRead(ids)),
});

let styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logoLink: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 25,
    },
    '&:hover': {
      backgroundColor: theme.palette.base1
    },
    '&:click':{
      backgroundColor: theme.palette.base1
    },
    // padding: "12px 0px"
    padding: 0,
    // height: '100%'
  },
  logoDesktop: {
    height: 26,
    maxWidth: 228,
    width: '100%',
    objectFit: 'cover',
    display:'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  logoMobile:{
    width: 26,
    height: 26,
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  nav: {
    backgroundColor: theme.palette.base1,
    color: '#4067B2',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.grey1}`,
    boxShadow: 'none',
    position: 'fixed',
    top: 0
  },
  toolbar:{
    // display: 'flex',
    // justifyContent: 'space-between',
    height: 45,
    minHeight: 0,
    paddingRight: 5,
    paddingLeft: 5
  },
  textField:{
    marginLeft: 10,
    marginRight: 10,
    width: '40%',
    // border: `1px solid ${theme.palette.border.secondary}`,
  },
  button:{
    // marginTop: 20,
    height: 35,
    color: theme.palette.text.tertiary,
    backgroundColor: 'none',
    border: `1px solid ${theme.palette.text.tertiary}`
  },
  navMenu:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textFieldLabel:{
    '&$cssFocused': {
      color: theme.palette.text.tertiary
    }
  },
  textfieldResize:{
    padding: "8px 12px",
    color: theme.palette.text.tertiary,
    borderColor: `${theme.palette.text.tertiary} !important`
  },
  textFieldShrink:{
    fontSize: 14,
    color: theme.palette.text.tertiary
  },
  textFieldRoot:{
    // padding: "2px 5px",
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.text.tertiary} !important`
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: `${theme.palette.text.tertiary} !important`
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttonText: { color: theme.palette.text.tertiary},
  navButtonText: {
    color: theme.palette.text.tertiary,
    fontSize: 12
  },
  listItemText: { fontSize: 12 },
  badge: {
    backgroundColor: 'red',
    color: 'white'
  },
  notificationLogo:{
    color: theme.palette.text.tertiary
  },
  unread: { backgroundColor: theme.palette.base4 },
  profilePic: {
    height: 'auto',
    width: '100%',
    objectFit: 'cover'
  },
  menuItem: {
    borderBottom: `1px solid ${theme.palette.border.primary}`
  },
  menuFont: { fontSize: 14 },
  menu: { padding: 0},
  avatar: {
    height: 35,
    width: 35,
    border: `1px solid ${theme.palette.text.tertiary}`
  }
});

class HomeNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      anchorEl: null,
      logoAnchorEl: null,
      searchInput: '',
      searchLoading: true,
      searchAnchorEl: null,
      notificationsAnchorEl: null
    };

    this.timeout = null;
    this.notificationsShown = 5;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogoMenuChangeTemplate = this.handleLogoMenuChangeTemplate.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.countNotifications = this.countNotifications.bind(this);
    this.openNotifications = this.openNotifications.bind(this);
    this.handleNotificationMenuOpen = this.handleNotificationMenuOpen.bind(this);
    this.handleNotificationRedirect = this.handleNotificationRedirect.bind(this);
    this.handleNotificationDate = this.handleNotificationDate.bind(this);
  }

  componentDidMount(){
    if(this.props.currentUser){
      this.props.fetchNotifications()
    }
  }

  // componentDidUpdate(prevProps, prevState, snapshot)
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.currentUser !== nextProps.currentUser){
  //     this.props.fetchNotifications()
  //   }
  //   return true
  // }

  countNotifications(){
    const { notifications } = this.props;
    let unread = Object.values(notifications).filter(x => !x.readAt)
    return unread.length
  }

  openNotifications(){
    this.setState({ notificationsAnchorEl: null },
    () => this.props.history.push("/account/notifications"))
  }

  handleNotificationDate(createdAt){
    let then = new Date(createdAt)
    const result = datetimeDifference(then, new Date());
    const resultKey = Object.keys(result)
      .filter(k => !!result[k])[0]
    return `${result[resultKey]}${resultKey.slice(0,1)}`
  }

  handleSubmit(e){
    e.preventDefault();
    let path = window.location.pathname.split('/');
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(credentials)
    .then((user) => {
      if(path.includes('signup') && user){
        let referralCode = path.pop();
        this.props.addUserByReferral(referralCode, user.id)
      }
    })
  }

  redirectToLogin(){
    let path = window.location.pathname.split('/');

    if(path.includes('signup')){
      let referralCode = path.pop();
      this.props.history.push(`/login/${referralCode}`)
    } else {
      this.props.history.push(`/login`)
    }
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  handleMenuToggle(anchor){
    return e => {
      const anchorEl = this.state[anchor]
      this.setState({ [anchor]: anchorEl ? null : e.currentTarget})
    }
  }

  handleNotificationMenuOpen(e){
    this.setState({ notificationsAnchorEl: e.currentTarget })
    const { notifications } = this.props;
    let notificationIds = Object.values(notifications).filter(x => !x.readAt)
      .sort((a,b) => (
        (new Date(b.createdAt)) - (new Date(a.createdAt))
      ))
      .slice(0, 4)
      .map(notification => notification.id)
    this.props.updateAsRead(notificationIds)
  }

  handleNotificationRedirect(notification){
    return e => {
      e.stopPropagation();
      this.setState({ notificationsAnchorEl: null },
      () => {
        if(notification.actedWithType === "Opportunity"){
          if(notification.action !== "posted"){
            this.props.history.push('/findandconnect/direct-connections')
          } else if(notification.targetableType === "Network"){
            this.props.history.push(`/findandconnect/${notification.targetableId}-${notification.targetableType.toLowerCase()}`)
          } else {
            this.props.history.push('/findandconnect')
          }
        } else if(notification.actedWithType === "Connection"){
          if(notification.action === "invited"){
            this.props.history.push('/mynetwork/invitations')
          }
        }
      })
    }
  }

  handleLogoMenuChangeTemplate(network_id){
    return e => {
      this.props.fetchSiteTemplate(network_id)
      .then(() => this.setState({ logoAnchorEl: null}))
    }
  }

  handleNavButtonClick = (field) => {
    return e => {
      e.preventDefault();
      if(field === 'findandconnect'){
        this.props.history.push('/findandconnect')
      }
    }
  }

  handleSearchChange(e){
    let input = e.target.value;
    this.setState({
      searchLoading: true,
      searchAnchorEl: (input.length > 0 ? e.currentTarget : null),
      searchInput: input
    }, () => {
      if(input.length > 0){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.props.fetchSearchResults(input)
          .then(() => this.setState({ searchLoading: false }))
        }, 500)
      }
    })
  }

  handleProfilePage(userid){
    return e => {
      // load profile page
      this.setState({ searchAnchorEl: null})
    }
  }

  handleLinkClose = (field) => {
    return e => {
      e.preventDefault();
      this.setState({ anchorEl: null, mobileMoreAnchorEl: null });

      switch(field){
        case 'account':
          return this.props.history.push('/account/profile');
        case 'admin':
          return window.location.replace(`${window.location.origin}/admin/login`);
        case 'logout':
          return this.props.logout()
            .then(() => this.props.history.push('/'),
            () => alert("There was a problem logging out. We're working on it!"));
        // case 'findandconnect':
        //   return this.props.history.push(`/${field}`);
        // case 'postopportunity':
        //   return this.props.history.push(`/${field}`);
        // case 'mynetwork':
        //   return this.props.history.push(`/${field}`);
        default:
          return this.props.history.push(`/${field}`);
      }
    }
  };

  capitalize(str){
    return str ? (str[0].toUpperCase() + str.slice(1)) : ''
  }


  render(){
    const { classes, currentUser, sessionErrors,
      siteTemplate, workspaces, users,
      searchResults, notifications } = this.props;

    const { auth, anchorEl, mobileMoreAnchorEl,
    logoAnchorEl, searchAnchorEl,
    searchLoading, searchOutput, searchInput,
    notificationsAnchorEl} = this.state;

    const searchOpen = Boolean(searchAnchorEl);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const logoMenuOpen = Boolean(logoAnchorEl);

    let sortedNotifications = Object.values(notifications).sort((a,b) => (
      (new Date(b.createdAt)) - (new Date(a.createdAt))
    )).slice(0,5)

    let pathName = this.props.location.pathname//split('/').pop();

    let loginOpen = Boolean(sessionErrors.length > 0);

    let renderMenu = (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        open={isMenuOpen}
        onClose={this.handleMenuToggle('anchorEl')}
        MenuListProps={{
          classes:{
            root: classes.menu
          }
        }}
      >
        <MenuItem onClick={this.handleLinkClose('account')}
          className={classes.menuItem}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuFont}>
            My Account
          </Typography>
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
        <MenuItem onClick={this.handleLinkClose('managenetworks')}
          className={classes.menuItem}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuFont}>
            Manage Networks
          </Typography>
        </MenuItem>}
        {currentUser && currentUser.isAdmin &&
          <MenuItem onClick={this.handleLinkClose('admin')}
            className={classes.menuItem}>
            <Typography variant="body1" align='left' color="textPrimary"
              className={classes.menuFont}>
              Admin
            </Typography>
          </MenuItem>
        }
        <MenuItem onClick={this.handleLinkClose('logout')}
          className={classes.menuItem}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuFont}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    )

    let renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuToggle('mobileMoreAnchorEl')}
        MenuListProps={{
          classes:{
            root: classes.menu
          }
        }}
      >
        {siteTemplate.testFeature &&
        <MenuItem onClick={this.handleLinkClose('testfeature')}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuItem}>
            Test Feature
          </Typography>
        </MenuItem>}
        <MenuItem onClick={this.handleLinkClose('findandconnect')}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuItem}>
            Opportunities
          </Typography>
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
        <MenuItem onClick={this.handleLinkClose('mynetwork')}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuItem}>
            My Trusted Network
          </Typography>
        </MenuItem>}
        {currentUser && currentUser.isAdmin &&
        <MenuItem onClick={this.handleLinkClose('managenetworks')}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuItem}>
            Manage Networks
          </Typography>
        </MenuItem>}
        <MenuItem onClick={this.handleLinkClose('account')}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuItem}>
            My Account
          </Typography>
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
          <MenuItem onClick={this.handleLinkClose('admin')}>
            <Typography variant="body1" align='left' color="textPrimary"
              className={classes.menuItem}>
              Admin
            </Typography>
          </MenuItem>
        }
        <MenuItem onClick={this.handleLinkClose('logout')}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuItem}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    )

    let notificationsMenu = (
      <Menu
        anchorEl={notificationsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        open={Boolean(notificationsAnchorEl)}
        onClose={this.handleMenuToggle('notificationsAnchorEl')}
        MenuListProps={{
          classes:{
            root: classes.menu
          }
        }}
      >
        {sortedNotifications.map(notification => {
          let actor = users[notification.actorId];
          return <MenuItem
            className={[classes.menuItem,(!notification.readAt ? classes.unread : '')].join(' ')}
            onClick={this.handleNotificationRedirect(notification)}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Avatar
                  style={{ marginRight: 10}}>
                  {actor && actor.profilePicUrl ? (
                    <VisibilitySensor>
                      <Img src={users[notification.actorId].profilePicUrl}
                        className={classes.profilePic}
                        />
                    </VisibilitySensor>
                  ):<PersonIcon />}
                </Avatar>
              </Grid>

              <Grid item xs={6} container direction='column'>
                <Typography align='left' color='textPrimary'
                  style={{ fontSize: 13 }}>
                  {`${notification.message}`}
                </Typography>
                <Typography align='left' color='textPrimary'
                  style={{ fontSize: 11,  textTransform: 'capitalize'}}>
                  {this.handleNotificationDate(notification.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
        })}
        <MenuItem onClick={this.openNotifications}
          className={classes.menuItem}>
          <Typography variant="body1" align='left' color="textPrimary"
            className={classes.menuFont}>
            {`See all notifications`}
          </Typography>
        </MenuItem>
      </Menu>
    )

    let navMenu = this.props.session === null ? (
      <Grid className={classes.navSectionContainer}
        item xs={2} md={6}
        container justify='flex-end' alignItems='center'>
        <div className={classes.sectionDesktop}>
          <TextField
            required
            id='email'
            label="Email"
            className={classes.textField}
            onChange={this.handleChange('email')}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              classes: {
                root: classes.textFieldLabel,
                focused: classes.cssFocused,
                shrink: classes.textFieldShrink
              }
            }}
            InputProps={{
              classes: {
                root: classes.textFieldRoot,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.textfieldResize
              },
            }}
            />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={this.handleChange('password')}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              classes: {
                root: classes.textFieldLabel,
                focused: classes.cssFocused,
                shrink: classes.textFieldShrink
              }
            }}
            InputProps={{
              classes: {
                root: classes.textFieldRoot,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.textfieldResize
              },
            }}
          />
        <Button variant="contained" color="primary"
            className={classes.button} onClick={this.handleSubmit}>
            Login
          </Button>
        </div>

        <div className={classes.sectionMobile}>
          <Button variant="contained" color="primary"
            onClick={this.redirectToLogin}
            disableRipple>
            Login
          </Button>
        </div>

      </Grid>
    ) : (
      <Grid className={classes.navSectionContainer}
        item xs={2} sm={2} md={5} lg={5}
        container justify='flex-end' alignItems='center'>

        <Grid container alignItems="center" justify="flex-end"
          className={classes.sectionDesktop}>
          {siteTemplate.testFeature &&
            <Button color='secondary'
              onClick={this.handleLinkClose('testfeature')}
              style={{ marginRight: 10}}>
              <Typography variant="h4" align='left'
                style={(pathName.includes('testfeature')) ? { fontWeight: 600} : {}}
                className={classes.navButtonText}>
                Test Feature
              </Typography>
            </Button>}
          <Button color='secondary'
            onClick={this.handleLinkClose('findandconnect')}>
            <Typography variant="h4" align='left'
              style={(pathName.includes('findandconnect')) ? { fontWeight: 600} : {}}
              className={classes.navButtonText}>
              Opportunities
            </Typography>
          </Button>
          {currentUser && currentUser.isAdmin &&
            <Button color='secondary'
            onClick={this.handleLinkClose('mynetwork')}
            style={{ marginRight: 10}}>
              <Typography variant="h4" align='left'
                style={(pathName.includes('mynetwork')) ? { fontWeight: 600} : {}}
                className={classes.navButtonText}>
                My Trusted Network
              </Typography>
            </Button>
          }

          {currentUser && currentUser.isAdmin &&
            <Badge badgeContent={this.countNotifications()}
              classes={{ badge: classes.badge}}
              onClick={this.handleNotificationMenuOpen}
              style={{ marginRight: 10}}>
              <NotificationsIcon className={classes.notificationLogo}/>
            </Badge>
          }
          <div>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuToggle('anchorEl')}
              className={classes.navButtonText}
              style={{ padding: 0, margin: "0px 12px" }}
            >
              {currentUser.profilePicUrl ? (
                <Avatar alt="profile-pic"
                  src={currentUser.profilePicUrl}
                  className={classes.avatar} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
        </Grid>

        <div className={classes.sectionMobile}>
          {currentUser && currentUser.isAdmin &&
            <Badge badgeContent={this.countNotifications()}
              classes={{ badge: classes.badge}}
              onClick={this.handleNotificationMenuOpen}
              style={{ marginRight: 5 }}>
              <NotificationsIcon className={classes.notificationLogo}/>
            </Badge>
          }
          <IconButton aria-haspopup="true" color="inherit"
            onClick={this.handleMenuToggle('mobileMoreAnchorEl')}
            classes={{ label: classes.buttonText }}
            style={{ padding: 0 }}>
            <MenuIcon className={classes.menuIcon}/>
          </IconButton>
        </div>
        {renderMenu}
        {renderMobileMenu}
        {notificationsMenu}
      </Grid>
    )

    let logoChunk = (
      <Grid item xs={2} sm={6} md={4} lg={4}>
        <IconButton aria-label="logo-link"
          className={classes.logoLink}
          onClick={() => this.props.history.push('/')}>
          <img alt='logo' className={classes.logoDesktop}
            src={siteTemplate.navLogo || whiteLogo} />
          <img alt='logo' className={classes.logoMobile}
            src={siteTemplate.navLogoMobile || whiteLogoMobile} />
        </IconButton>

        {workspaces.length > 1 &&
          currentUser &&
          <IconButton
            aria-haspopup="true"
            onClick={this.handleMenuToggle('logoAnchorEl')}
            style={{ padding: 3}}
            classes={{ label: classes.buttonText}}>
            <KeyboardArrowDownIcon />
          </IconButton>}

        <Popper open={logoMenuOpen} anchorEl={logoAnchorEl}
          transition disablePortal
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener
                  onClickAway={this.handleMenuToggle('logoAnchorEl')}>
                  <MenuList>
                    {workspaces.map(workspace => (
                      <MenuItem onClick={this.handleLogoMenuChangeTemplate(workspace.id)}>
                        <Typography variant="body1" align='left' color="textPrimary" >
                          {workspace.title}
                        </Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

      </Grid>
    )

    // <Link to='/' className={classes.logoLink}>
    //   <img alt='logo' className={classes.logo} src={logo} />
    // </Link>
    // <div className={classes.grow} />
    return (
      <div>
        <AppBar position="static" className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems='center'>
              {logoChunk}
              {currentUser && currentUser.isAdmin ? <Grid item xs={8} sm={4} md={3} lg={3}>
                <SearchBar />
              </Grid> : <div style={{ flexGrow: 1}}/>}
              {navMenu}
            </Grid>
          </Toolbar>
        </AppBar>

        <LoginModal open={loginOpen} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(HomeNav));
