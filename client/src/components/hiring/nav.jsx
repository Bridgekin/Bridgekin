import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import blackLogo from '../../static/Bridgekin_Logo.png';
import blackLogoMobile from '../../static/apple-touch-icon.png';

import { login, logout } from '../../actions/session_actions';
import { openLogin } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  siteTemplate: state.siteTemplate
});

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(login(payload)),
  logout: () => dispatch(logout()),
  openLogin: (login) => dispatch(openLogin(login))
});

const styles = theme => ({
  root: {
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
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    boxShadow: 'none',
    position: 'fixed',
    top: 0
    // borderBottom: `1px solid ${theme.palette.grey1}`,
  },
  textFieldLabel:{
    '&$cssFocused': {
      color: theme.palette.text.tertiary
    }
  },
  textfieldResize:{
    padding: "8px 12px",
    fontSize: 14,
    // padding: "4px 12px",
    // color: 'black', //theme.palette.text.tertiary,
    // borderColor:  'black'//`${theme.palette.text.tertiary} !important`
  },
  textFieldShrink:{
    fontSize: 14,
    color: 'black',//theme.palette.text.tertiary
  },
  textFieldRoot:{
    // padding: "2px 5px",
    '&$cssFocused $notchedOutline': {
      borderColor: 'black',//`${theme.palette.text.tertiary} !important`
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: 'black',//`${theme.palette.text.tertiary} !important`
  },
})

class HiringNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  handleSubmit(){
    const { currentUser } = this.props;

    if(currentUser){
      this.props.logout();
    } else {
      this.props.openLogin({ page: 'login' });
    }
  }

  // handleLogin(e){
  //   e.preventDefault();
  //   let path = window.location.pathname.split('/');
  //   let credentials = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };

  //   this.props.login(credentials)
  //   .then(() => this.props.history.push('/hiring/dashboard'))
  // }

  render(){
    const { classes, siteTemplate, currentUser } = this.props;
    const { email, password } = this.state;
    
    const logoComp = (
      <IconButton aria-label="logo-link"
        className={classes.logoLink}
        onClick={() => this.props.history.push('/hiring/home')}>
        <img alt='logo' className={classes.logoDesktop}
          src={siteTemplate.navLogo || blackLogo} />
        <img alt='logo' className={classes.logoMobile}
          src={siteTemplate.navLogoMobile || blackLogoMobile} />
      </IconButton>
    )

    const session = (
      <Button style={{textTransform: 'capitalize'}}
        onClick={this.handleSubmit}>
        <Typography color='textSecondary'>
          {currentUser ? `Logout` : `Login`}
        </Typography>
      </Button>
    )

    // const login = (
    //   <Grid item xs={3} container justify='center'>
    //     <TextField
    //       required
    //       label="Email"
    //       className={classes.textField}
    //       margin="normal"
    //       variant='outlined'
    //       type='text'
    //       value={email}
    //       onChange={this.handleChange('email')}
    //       onMouseUp={this.handleChange('email')}
    //       InputLabelProps={{
    //         shrink: true,
    //         classes: {
    //           root: classes.textFieldLabel,
    //           focused: classes.cssFocused,
    //           shrink: classes.textFieldShrink
    //         }
    //       }}
    //       InputProps={{
    //         classes: {
    //           root: classes.textFieldRoot,
    //           focused: classes.cssFocused,
    //           notchedOutline: classes.notchedOutline,
    //           input: classes.textfieldResize
    //         },
    //       }}
    //       />
    //     <TextField
    //       required
    //       label="Password"
    //       className={classes.textField}
    //       margin="normal"
    //       variant='outlined'
    //       type='password'
    //       value={password}
    //       onChange={this.handleChange('password')}
    //       onMouseUp={this.handleChange('password')}
    //       InputLabelProps={{
    //         shrink: true,
    //         classes: {
    //           root: classes.textFieldLabel,
    //           focused: classes.cssFocused,
    //           shrink: classes.textFieldShrink
    //         }
    //       }}
    //       InputProps={{
    //         classes: {
    //           root: classes.textFieldRoot,
    //           focused: classes.cssFocused,
    //           notchedOutline: classes.notchedOutline,
    //           input: classes.textfieldResize
    //         },
    //       }}
    //       />
    //     <Button style={{textTransform: 'capitalize'}}>
    //       <Typography color='textSecondary'>
    //         {`Login`}
    //       </Typography>
    //     </Button>
    //   </Grid>
    // )

    return (
      <div>
        <AppBar position="static" className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems='center' justify='space-between'>
              {logoComp}
              <div style={{ flexGrow: 1}}/>
              {session}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringNav));
