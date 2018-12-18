import React from 'react';
import { Link } from 'react-router-dom';

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

import logo from '../../static/logo_blue.png';
import './home_nav.css';

import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout())
});

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  logo: {
    width: 100
  },
  nav: {
    backgroundColor: 'white',
    color: '#4067B2',
    marginBottom: 20,
    width: '100%'
  },
  textField:{
    marginLeft: 10,
    marginRight: 10
  },
  button:{
    marginTop: 20
  }
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

    this.props.login(this.state)
      .then(() => this.props.history.push(`/account`),
      () => alert('incorrect username and password'));
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

  handleLinkClose = (field) => {
    return e => {
      e.preventDefault();
      this.setState({ anchorEl: null });

      if(field === 'account'){
        console.log('jumping to account page')
      } else if (field === 'logout') {
        this.props.logout()
          .then(() => this.props.history.push(`/`),
          () => alert("There was a problem logging out. We're working on it!"));
      }
    }
  };

  render(){
    let classes = this.props.classes;

    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    console.log('cu', this.props.currentUser);

    let navMenu = this.props.currentUser === undefined ? (
      <form onSubmit={this.handleSubmit}>
        <TextField
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange('email')}
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
        />
        <Button variant="contained" color="secondary"
          className={classes.button} onClick={this.handleSubmit}>
          Login
        </Button>
      </form>
    ) : (
      <div className='nav-menu-container'>
        <Button color='inherit'>Find & Connect</Button>
        <Button color='inherit'>Post Opportunity</Button>
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
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
            <MenuItem onClick={this.handleLinkClose('logout')}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <img alt='logo' className={classes.logo}src={logo} />
            </IconButton>
            <div className={classes.grow} />
            {navMenu}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeNav));
