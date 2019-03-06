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

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import { MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

// import logo from '../../static/castle.jpg';
import logo from '../../static/Bridgekin_Logo.png';
import LoginModal from './login_modal';

import { login, logout } from '../../actions/session_actions';
import { getAuthUserId } from '../../util/session_api_util';
import { receiveCurrentUser } from '../../actions/session_actions';
import { receiveUser } from '../../actions/user_actions';
import { fetchSiteTemplate } from '../../actions/site_template_actions';
import { addUserByReferral } from '../../actions/member_users_actions';
import { handleAuthErrors } from '../../actions/fetch_error_handler';

const mapStateToProps = (state, ownProps) => {
  const siteTemplate = state.siteTemplate;
  const theme = getTheme(siteTemplate);
  return ({
    currentUser: state.users[state.session.id],
    session: state.session.id,
    sessionErrors: state.errors.login,
    workspaces: Object.values(state.workspaces),
    siteTemplate, theme
  })
};

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
  receiveUser: (user) => dispatch(receiveUser(user)),
  fetchSiteTemplate: (networkId) => dispatch(fetchSiteTemplate(networkId)),
  addUserByReferral: (referralCode, userId) => dispatch(addUserByReferral(referralCode, userId))
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
    padding: "12px 0px"
  },
  logo: {
    height: 26,
    maxWidth: 228,
    width: '100%',
    objectFit: 'cover'
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
  textField:{
    marginLeft: 10,
    marginRight: 10,
    width: '40%',
    border: `1px solid ${theme.palette.secondary}`,
  },
  button:{
    marginTop: 20,
    height: 40
  },
  toolbar:{
    // display: 'flex',
    // justifyContent: 'space-between',
    height: 64,
    paddingRight: 5,
    paddingLeft: 5
  },
  navMenu:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textfieldResize:{
    padding: 14
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
  textFieldLabel:{
    fontSize: 14
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey1}`,
    // marginRight: theme.spacing.unit * 2,
    // marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
      // marginLeft: theme.spacing.unit * 3,
      // width: 'auto',
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
  buttonText: { color: theme.palette.text.tertiary},
  navButtonText: { color: theme.palette.text.tertiary}
});

class HomeNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      anchorEl: null,
      logoAnchorEl: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleLogoMenuClick = this.handleLogoMenuClick.bind(this);
    this.handleLogoMenuChangeTemplate = this.handleLogoMenuChangeTemplate.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleClickAwayClose = this.handleClickAwayClose.bind(this);
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

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleProfileMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogoMenuClick(e){
    const {logoAnchorEl} = this.state;
    this.setState({ logoAnchorEl: logoAnchorEl ? null : e.currentTarget });
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

  handleClickAwayClose(e) {
    this.setState({ logoAnchorEl: null });
  }

  handleLinkClose = (field) => {
    return e => {
      e.preventDefault();
      this.setState({ anchorEl: null, mobileMoreAnchorEl: null });

      switch(field){
        case 'account':
          return this.props.history.push('/account/home');
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

  render(){
    let { classes, currentUser, sessionErrors,
      siteTemplate, workspaces} = this.props;

    const { auth, anchorEl, mobileMoreAnchorEl,
    logoAnchorEl } = this.state;

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const logoMenuOpen = Boolean(logoAnchorEl);

    let pathName = this.props.location.pathname//split('/').pop();

    let loginOpen = Boolean(sessionErrors.length > 0);

    let renderMenu = (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={this.handleProfileMenuClose}
      >
        <MenuItem onClick={this.handleLinkClose('account')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            My Account
          </Typography>
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
        <MenuItem onClick={this.handleLinkClose('managenetworks')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            Manage Networks
          </Typography>
        </MenuItem>}
        {currentUser && currentUser.isAdmin &&
          <MenuItem onClick={this.handleLinkClose('admin')}>
            <Typography variant="body1" align='left' color="textPrimary" >
              Admin
            </Typography>
          </MenuItem>
        }
        <MenuItem onClick={this.handleLinkClose('logout')}>
          <Typography variant="body1" align='left' color="textPrimary" >
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
        onClose={this.handleMobileMenuClose}
      >
        {siteTemplate.testFeature &&
        <MenuItem onClick={this.handleLinkClose('testfeature')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            Test Feature
          </Typography>
        </MenuItem>}
        <MenuItem onClick={this.handleLinkClose('findandconnect')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            Find & Connect
          </Typography>
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
        <MenuItem onClick={this.handleLinkClose('mynetwork')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            My Trusted Network
          </Typography>
        </MenuItem>}
        {currentUser && currentUser.isAdmin &&
        <MenuItem onClick={this.handleLinkClose('managenetworks')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            Manage Networks
          </Typography>
        </MenuItem>}
        <MenuItem onClick={this.handleLinkClose('account')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            My Account
          </Typography>
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
          <MenuItem onClick={this.handleLinkClose('admin')}>
            <Typography variant="body1" align='left' color="textPrimary" >
              Admin
            </Typography>
          </MenuItem>
        }
        <MenuItem onClick={this.handleLinkClose('logout')}>
          <Typography variant="body1" align='left' color="textPrimary" >
            Logout
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
            margin="normal"
            onChange={this.handleChange('email')}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              classes: {
                shrink: classes.textFieldLabel
              }
            }}
            InputProps={{
              classes: {
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
            margin="normal"
            onChange={this.handleChange('password')}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              classes: {
                shrink: classes.textFieldLabel
              }
            }}
            InputProps={{
              classes: {
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

        <div className={classes.sectionDesktop}>
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
              Find & Connect
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
          </Button>}
          <div>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              className={classes.navButtonText}
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
        </div>

        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" color="inherit"
            onClick={this.handleMobileMenuOpen}
            classes={{ label: classes.buttonText }}
            style={{ padding: 0 }}>
            <MenuIcon className={classes.menuIcon}/>
          </IconButton>
        </div>
        {renderMenu}
        {renderMobileMenu}
      </Grid>
    )

    let searchBar = (false && currentUser) ? (
      <Grid item xs={0} sm={4} md={3} lg={3}
        className={classes.search}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
      </Grid>
    ) : <div style={{ flexGrow: 1 }} />

    let logoChunk = (
      <Grid item xs={9} sm={6} md={4} lg={4}>
        <IconButton aria-label="logo-link"
          className={classes.logoLink}
          onClick={() => this.props.history.push('/')}>
          <img alt='logo' className={classes.logo}
            src={siteTemplate.navLogo || logo} />
        </IconButton>

        {workspaces.length > 1 &&
          <IconButton
            aria-haspopup="true"
            onClick={this.handleLogoMenuClick}
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
                <ClickAwayListener onClickAway={this.handleClickAwayClose}>
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
              {searchBar}
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
