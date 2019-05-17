import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { hireSignup } from '../../actions/session_actions';
import { openSignup } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userErrors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
  hireSignup: user => dispatch(hireSignup(user)),
  openSignup: () => dispatch(openSignup())
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  backgroundGrid:{
    position: 'relative',
    paddingTop: 45,
    flexGrow: 1,
    backgroundColor: theme.palette.base2,
  }
})

class HiringHome extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fname: '',
      email: '',
      password: ''
    }

    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  handleSignup(){
    const { fname, email, password } = this.state;
    //do some things
    let user = {
      fname, email, password,
      lname: ''
    }
    this.props.hireSignup(user)
    .then(() => {
      if(this.props.userErrors.length === 0){
        this.props.history.push('/hiring/dashboard')
      } else {
        this.props.openSignup();
      }
    })
  }

  render(){
    const { classes, dimensions } = this.props;
    const { fname, email, password } = this.state;

    let content = <Grid item xs={10} sm={8}>
      <Grid container justify='center'>
        <Typography align='center' color='textPrimary'
          gutterBottom
          style={{ fontSize: 20, fontWeight: 600, marginTop: 20}}>
          {`Super-Charge Your AngelList Postings!`}
        </Typography>
        <Typography align='center' color='textPrimary'
          gutterBottom
          style={{ fontSize: 14}}>
          {`Drive more traffic to your postings by Angel List postings`}
        </Typography>
        <Grid item xs={7} container justify='center'
          style={{ marginTop: 30 }}>
          <Typography align='center' color='textPrimary'
            gutterBottom
            style={{ fontSize: 20, fontWeight: 600}}>
            {`Signup`}
          </Typography>
          <TextField
            required
            label="First Name"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant='outlined'
            value={fname}
            onChange={this.handleChange('fname')}
            onMouseUp={this.handleChange('fname')}
            />
          <TextField
            required
            label="Email"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')}
            />
          <TextField
            required
            label="Password"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant='outlined'
            type="password"
            value={password}
            onChange={this.handleChange('password')}
            onMouseUp={this.handleChange('password')}
            />
          <Button variant="contained" color="primary"
            className={classes.button} fullWidth
            disabled={!fname || !email || !password}
            onClick={this.handleSignup}
            style={{ margin: "10px 0px"}}>
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Grid>

    return <Grid container justify='center'
      className={classes.backgroundGrid}>
      <Grid container item xs={12} sm={10} md={8} justify='center'
        style={{ background: 'white', minHeight: dimensions.height - 45, paddingTop: 18}}>
        {content}
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringHome));
