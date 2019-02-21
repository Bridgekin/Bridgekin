import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';

import PropTypes from 'prop-types';
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

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import logo from '../../static/Bridgekin_Logo.png';
import './home_nav.css';
import LoginModal from './login_modal';

import { login, logout } from '../../actions/session_actions';
import { getAuthUserId } from '../../util/session_api_util';
import { receiveCurrentUser } from '../../actions/session_actions';
import { receiveUser } from '../../actions/user_actions';
import { handleAuthErrors } from '../../actions/fetch_error_handler';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  session: state.session.id,
  sessionErrors: state.errors.login
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
  receiveUser: (user) => dispatch(receiveUser(user))
});

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logoLinkDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    marginLeft: 25,
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&:click':{
      backgroundColor: '#fff'
    },
    padding: "12px 0px"
  },
  logoLinkMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&:click':{
      backgroundColor: '#fff'
    },
    padding: "12px 0px"
  },
  logo: {
    height: 26
  },
  nav: {
    backgroundColor: 'white',
    color: '#4067B2',
    width: '100%',
    borderBottom: `0.5px solid ${theme.palette.grey1}`,
    boxShadow: 'none',
    position: 'fixed',
    top: 0
  },
  textField:{
    marginLeft: 10,
    marginRight: 10,
    width: '40%',
    border: `0.5px solid ${theme.palette.secondary}`,
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
  // navSectionContainer:{
  //   display: 'flex',
  //   justifyContent: 'space-between'
  // },
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
  // menuIcon:{ color: }
};

class HomeNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      anchorEl: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(credentials)
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

  handleNavButtonClick = (field) => {
    return e => {
      e.preventDefault();
      if(field === 'findandconnect'){
        this.props.history.push('/findandconnect')
      }
    }
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
    let { classes, currentUser, sessionErrors, width } = this.props;

    const { auth, anchorEl, mobileMoreAnchorEl } = this.state;
    // const open = Boolean(anchorEl);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    let pathName = this.props.location.pathname.split('/').pop();

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
          My Account
        </MenuItem>
        {currentUser && currentUser.isAdmin &&
          <MenuItem onClick={this.handleLinkClose('admin')}>
            Admin
          </MenuItem>
        }
        <MenuItem onClick={this.handleLinkClose('logout')}>
          Logout
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
          <Button variant="contained" color="secondary"
            className={classes.button} onClick={this.handleSubmit}>
            Login
          </Button>
        </div>

        <div className={classes.sectionMobile}>
          <Button variant="contained" color="secondary"
            onClick={() => this.props.history.push('/login')}
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
          <Button color='secondary'
            onClick={this.handleLinkClose('findandconnect')}>
            <Typography variant="h4" align='left' color="textPrimary"
              style={(pathName === 'findandconnect') ? { fontWeight: 600} : {}}>
              Find & Connect
            </Typography>
          </Button>
          {currentUser && currentUser.isAdmin &&
            <Button color='secondary'
            onClick={this.handleLinkClose('mynetwork')}
            style={{ marginRight: 10}}>
            <Typography variant="h4" align='left' color="textPrimary"
              style={(pathName === 'mynetwork') ? { fontWeight: 600} : {}}>
              My Trusted Network
            </Typography>
          </Button>}
          <div>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="secondary"
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
            style={{ padding: 0 }}>
            <MenuIcon className={classes.menuIcon} color='primary'/>
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

    // <Link to='/' className={classes.logoLink}>
    //   <img alt='logo' className={classes.logo} src={logo} />
    // </Link>
    // <div className={classes.grow} />
    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems='center'>
              <Grid item xs={9} sm={6} md={4} lg={4}>
                <IconButton aria-label="logo-link"
                  className={width === 'xs' ? classes.logoLinkMobile : classes.logoLinkDesktop}
                  onClick={() => this.props.history.push('/')}>
                  <img alt='logo' className={classes.logo} src={logo} />
                </IconButton>
              </Grid>

              {searchBar}
              {navMenu}
            </Grid>
          </Toolbar>
        </AppBar>

        <LoginModal open={loginOpen} />
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(HomeNav)));
