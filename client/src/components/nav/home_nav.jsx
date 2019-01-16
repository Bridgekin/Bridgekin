import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

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

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import logo from '../../static/Bridgekin_Logo.png';
import './home_nav.css';

import { login, logout } from '../../actions/session_actions';
import { getAuthUserId } from '../../util/session_api_util';
import { receiveCurrentUser } from '../../actions/session_actions';
import { receiveUser } from '../../actions/user_actions';
import { handleAuthErrors } from '../../actions/fetch_error_handler';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  session: state.session.id,
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
  logoLink: {
    marginLeft: 20,
    marginRight: 20,
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&:click':{
      backgroundColor: '#fff'
    }
  },
  logo: {
    width: 237
  },
  nav: {
    backgroundColor: 'white',
    color: '#4067B2',
    width: '100%',
    borderBottom: `0.5px solid ${theme.palette.grey1}`,
    boxShadow: 'none'
  },
  textField:{
    marginLeft: 10,
    marginRight: 10,
    width: '40%',
    border: `0.5px solid ${theme.palette.secondary}`,
  },
  button:{
    marginTop: 20,
    height: 25
  },
  toolbar:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  navMenu:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textfieldResize:{
    padding: 14
  },
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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
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
      this.setState({ anchorEl: null });

      switch(field){
        case 'account':
          return this.props.history.push('/account/home');
        case 'admin':
          return window.location.replace(`${window.location.origin}/admin/login`);
        case 'logout':
          return this.props.logout()
            .then(() => this.props.history.push('/'),
            () => alert("There was a problem logging out. We're working on it!"));
        default:
          return;
      }
    }
  };

  render(){
    let { classes, currentUser } = this.props;

    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let navMenu = this.props.session === null ? (
      <div className={classes.navMenu}>
        <TextField
          required
          id='email'
          label="Email"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange('email')}
          variant="outlined"
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
    ) : (
      <div className='nav-menu-container'>
        <NavLink to='/findandconnect' className='button-react-link'>
          <Button color='secondary'>Find & Connect</Button>
        </NavLink>
        <NavLink to='/postopportunity' className='button-react-link'>
          <Button color='secondary'>Post Opportunity</Button>
        </NavLink>
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="secondary"
          >
            <AccountCircle />
          </IconButton>

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
            open={open}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleLinkClose('account')}>My Account</MenuItem>
            {currentUser.isAdmin && <MenuItem onClick={this.handleLinkClose('admin')}>Admin</MenuItem>}
            <MenuItem onClick={this.handleLinkClose('logout')}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            <Link to='/' className={classes.logoLink}>
              <img alt='logo' className={classes.logo}src={logo} />
            </Link>
            {navMenu}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeNav));
