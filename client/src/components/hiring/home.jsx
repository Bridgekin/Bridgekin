import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { hireSignup } from '../../actions/session_actions';
import { openSignup } from '../../actions/modal_actions';
import HiringContainer from './hiring_container';
import MaskedInput from 'react-text-mask';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userErrors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
  hireSignup: user => dispatch(hireSignup(user)),
  openSignup: (payload) => dispatch(openSignup(payload))
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
  },
  // grid:{
  //   background: 'white', 
  //   paddingTop: 18,
  //   borderRight: "1px solid light-grey"
  // }
  grid:{
    paddingTop: 64,
    paddingBottom: '10%'
  },
  container:{
  },
  textField:{
    // height: 34
  }
})

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

class HiringHome extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fname: '',
      email: '',
      password: '',
      phoneNumber: ''
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
    const { fname, email, password, 
      phoneNumber} = this.state;
    //do some things
    let user = {
      fname, email, password, lname: '',
      phoneNumber: phoneNumber.replace(/[ ()-]/g,"")
    }
    this.props.hireSignup(user)
    .then(() => {
      if(this.props.userErrors.length === 0){
        this.props.history.push('/hiring/dashboard')
      } else {
        this.props.openSignup({ page: 'response'});
      }
    })
  }

  render(){
    const { classes, dimensions, currentUser } = this.props;
    const { fname, email, password, phoneNumber } = this.state;

    let phoneComponent = <div></div>

    let form = (
      <Grid container justify='center' alignItems='center' spacing={12}>
        <Grid item xs={10} container justify='space-around'>
          <TextField
            required
            label="First Name"
            className={classes.textField}
            margin="normal"
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
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')}
            />
        </Grid>

        <Grid item xs={10} container justify='space-around'>
          <TextField
            required
            label="Mobile Number"
            className={classes.textField}
            margin="normal"
            variant='outlined'
            value={phoneNumber}
            onChange={this.handleChange('phoneNumber')}
            onMouseUp={this.handleChange('phoneNumber')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
            />
          <TextField
            required
            label="Password"
            className={classes.textField}
            margin="normal"
            variant='outlined'
            type="password"
            value={password}
            onChange={this.handleChange('password')}
            onMouseUp={this.handleChange('password')}
            />
        </Grid>

        <Grid container justify='center'>
          <Button variant="contained" color="primary"
            className={classes.button}
            disabled={!fname || !email || !password}
            onClick={this.handleSignup}
            style={{ margin: 20}}>
            {`SignUp`}
          </Button>
        </Grid>
      </Grid>
    )

    let toDashboard = <Grid container justify='center'
    style={{ marginTop: 30 }}>
      <Button variant='contained' color='primary'
      onClick={() => this.props.history.push('/hiring/dashboard')}>
        {`To My Dashboard`}
      </Button>
    </Grid>

    return (
      <Grid container justify='center' alignItems='center' className={classes.grid}
      style={{ minHeight: dimensions.height}}>
        <Grid item container xs={11} sm={9} md={8}
        justify='center'>
          <Grid item xs={8}>
            <Typography color='textPrimary' align='center' gutterBottom
              style={{ fontSize: 64, fontWeight: 600}}>
              {`Hire smarter from within your network`}
            </Typography>
            <Typography color='textPrimary' align='center' gutterBottom
            stle={{ fontSize: 18}}>
              {`Easily get referred top candidates today, send a reward when you hire them tomorrow`}
            </Typography>
          </Grid>

          {currentUser ? toDashboard : form}
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringHome));
