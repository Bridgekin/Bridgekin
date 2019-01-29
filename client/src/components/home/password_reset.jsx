import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { login } from '../../actions/session_actions';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import { clearUserErrors } from '../../actions/error_actions';
import { resetPassword } from '../../actions/user_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  userErrors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
  resetPassword: email => dispatch(resetPassword(email)),
  clearUserErrors: () => dispatch(clearUserErrors())
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  // grid:{
  //   flexGrow: 1,
  //   paddingTop: 50
  // },
  cover: {
    width: '100%',
    height: 217
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  responseHeader: {
    marginBottom: 20
  },
  textField: {
    marginBottom: 20
  },
  buttonWrapper:{
    display: 'flex',
    justifyContent: 'center'
  }
});


class PasswordReset extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      sent: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.props.userErrors){
      this.props.clearUserErrors();
    }

    this.props.resetPassword(this.state.email)
    .then(() => this.setState({ sent: true }))
  }

  handleClose(path){
    return e => {
      e.preventDefault();
      if(this.props.userErrors){
        this.props.clearUserErrors();
      }

      if(path === 'resend'){
        this.setState({ sent: false})
      } else {
        this.props.history.push(path);
      }
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ email: e.target.value});
  }

  render(){
    const { classes } = this.props;
    const { sent } = this.state;

    let userErrors = this.props.userErrors.map(error => (
      <ListItem>
        <ListItemText primary={error} />
      </ListItem>
    ))

    let response = this.props.userErrors.length === 0 ? (
      <Grid item xs={8} sm={7} md={7} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='secondary'
          className={classes.responseHeader} align='left' gutterBottom>
          Password Reset Sent
        </Typography>
        <Typography variant="body2" align='left'>
          We've sent you an email with a link to change your password.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose('/login')} color='secondary'>
            Back to login
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={8} sm={7} md={7} className={classes.grid}>
        <Typography variant="h2" color='secondary' align='left'
          className={classes.responseHeader} >
          Password Change Error
        </Typography>
        <Typography variant="body2"
          align='left'>
          Unfortunately, we don't have an account associated with that email.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{ marginTop: 30 }}
            onClick={this.handleClose('/login')} color='secondary'>
            Back to login
          </Button>
          <Button variant="contained"
            style={{margin: "30px 0px 0px 10px"}}
            onClick={this.handleClose('resend')} color='secondary'>
            Resend
          </Button>
        </Grid>
      </Grid>
    )

    let form = (
      <Grid item xs={8} sm={7} md={7} className={classes.grid}>
        <Typography variant="h2" align='center' color="textPrimary"
          className={classes.signinHeader}>
          Forgot your password?
        </Typography>
        <TextField
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          fullWidth
          variant='outlined'
          value={this.state.email}
          onChange={this.handleChange}
          />
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="secondary"
            className={classes.button} onClick={this.handleSubmit}>
            Reset Password
          </Button>
        </div>
      </Grid>
    )

    let cardText = sent ? response : form;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify="center" alignItems="center"
          className={classes.grid}
          style={{ top: 64, position: 'relative' }}>

          <Grid item xs={10} sm={8} md={6}
            style={{ paddingTop: 40 }}>
            <Card className={classes.card}>
              <Grid container justify="center" alignItems="center">
                {cardText}
              </Grid>

            </Card>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PasswordReset));
