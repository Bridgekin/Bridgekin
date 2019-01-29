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

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import { clearUserErrors } from '../../actions/error_actions';
import { passwordUpdate } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  userErrors: state.errors.users,
  resetToken: ownProps.match.params.resetToken
});

const mapDispatchToProps = dispatch => ({
  passwordUpdate: payload => dispatch(passwordUpdate(payload)),
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
      password:'',
      passwordConfirmation: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.props.userErrors){
      this.props.clearUserErrors();
    }

    let payload = {
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      resetToken: this.props.resetToken
    }

    debugger

    this.props.passwordUpdate(payload)
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

  handleChange(field){
    return e => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  render(){
    const { classes } = this.props;
    const { sent } = this.state;

    let passwordErrors = this.props.userErrors.map(error => (
      <ListItem>
        <ListItemText primary={error} />
      </ListItem>
    ))

    let response = this.props.userErrors.length === 0 ? (
      <Grid item xs={8} sm={7} md={7} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='secondary'
          className={classes.responseHeader} align='left' gutterBottom>
          Password Updated
        </Typography>
        <Typography variant="body2" align='left'>
          Your password has been updated!
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
          Password Update Error
        </Typography>
        <Typography variant="body2"
          align='left'>
          Unfortunately, we weren't able to update your password because:
        </Typography>
        <List>
          {passwordErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{ marginTop: 30 }}
            onClick={this.handleClose('/login')} color='secondary'>
            Back to login
          </Button>
        </Grid>
      </Grid>
    )

    let form = (
      <Grid item xs={8} sm={7} md={7} className={classes.grid}>
        <Typography variant="h2" align='center' color="textPrimary"
          className={classes.signinHeader}>
          Update your password
        </Typography>
        <TextField
          required
          label="Password"
          className={classes.textField}
          margin="normal"
          fullWidth
          type="password"
          variant='outlined'
          value={this.state.password}
          onChange={this.handleChange('password')}
          />
        <TextField
          required
          label="Password Confirmation"
          className={classes.textField}
          margin="normal"
          fullWidth
          type="password"
          variant='outlined'
          value={this.state.passwordConfirmation}
          onChange={this.handleChange('passwordConfirmation')}
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
