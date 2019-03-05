import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import WaitlistModal from '../waitlist_modal';

import { registerWaitlistFromReferral } from '../../actions/waitlist_user_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  // waitlistErrors: state.errors.waitlistUsers
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    // padding: "40px 0px",
    // borderTop: `0.5px solid ${theme.palette.grey1}`,
    // backgroundColor: 'RGBA(196,196,196,0.1)'
  },
  headerTypography:{
    margin: "25px 0px 40px 0px"
  },
  refButton:{
    fontSize: 14,
    fontWeight: 500,
    // marginTop: 25,
    // height: 26,
    // width: 180
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '20%',
    left: '50%',
    marginLeft: -12,
  },
  textField:{
    margin: 3
    // padding: "10px 14px"
  },
  textfieldInput:{
    padding: "10px 14px"
  },
  fieldLabel:{
    fontSize: 14,
    fontWeight: 600
  },
  inviteCounter:{
    fontSize: 12
  }
});

class OpportunityWaitlist extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      fname: '',
      open: false,
      success: false,
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(field){
    return e => {
      e.preventDefault();
      this.setState({ [field]: e.target.value})
    }
  }

  handleSubmit(e){
    e.preventDefault();

    let user = {
      email: this.state.email,
      fname: this.state.fname,
      fromReferralId: this.props.currentUser.id
    }

    if (!this.state.loading) {
      this.setState({ success: false, loading: true },
      () => {
        this.props.registerWaitlistFromReferral(user)
          .then(res => {
            this.setState({
              loading: false,
              success: true,
              open: true,
              email: '',
              fname: ''
            })
          })
      })
    }
  }

  handleClose(){
    this.setState({ open: false });
  }

  render(){
    const { classes, currentUser } = this.props;
    const { loading, open } = this.state;

    return(
      <Grid container className={classes.root}
        justify="center" alignItems="center" spacing={8}>

        <Grid item xs={5} sm={12} container flexDirection='column'>
          <TextField
          required
          id="outlined-required"
          placeholder="First Name"
          className={classes.textField}
          fullWidth
          variant="outlined"
          onChange={this.handleChange('fname')}
          value={this.state.fname}
          InputProps={{
            classes:{
              input: classes.textfieldInput
            }
          }}
          />
        </Grid>
        <Grid item xs={7} sm={12} container flexDirection='column'>
          <TextField
          required
          id="outlined-required"
          placeholder="Email"
          className={classes.textField}
          fullWidth
          variant="outlined"
          onChange={this.handleChange('email')}
          value={this.state.email}
          InputProps={{
            classes:{
              input: classes.textfieldInput
            }
          }}
          />
        </Grid>
        <Grid item xs={12} container justify='flex-end'>
          <Button variant="contained" color='primary'
            className={classes.refButton}
            onClick={this.handleSubmit}
            disabled={loading || currentUser.invitesRemaining === 0}>
            Invite Now
            {loading && <CircularProgress size={24}
            className={classes.buttonProgress} />}
          </Button>
        </Grid>
        <Grid item xs={12} container justify='flex-end'>
          <Typography align='Right' color='textSecondary' variant='body1'
            className={classes.inviteCounter}>
            {currentUser.invitesRemaining > 0 ?
              `Remaining: ${currentUser.invitesRemaining}` :
              `You're currently out of invites!`
            }
          </Typography>
        </Grid>

        <WaitlistModal
          open={open}
          handleClose={this.handleClose}
          referred={true}/>
      </Grid>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityWaitlist));

//REFERRAL CODE FOR WHEN WE WANT TO CREATE REFERRAL LINKS

// let networks = ([
//   <MenuItem value={10}>Ten</MenuItem>,
//   <MenuItem value={20}>Twenty</MenuItem>,
//   <MenuItem value={30}>Thirty</MenuItem>
// ])

// <Grid container className={classes.root}
//   justify="center" alignItems="center" spacing={24}>
//
//   <Grid item xs={9} justify="flex-end" alignItems="center">
//     <Typography variant="h4" gutterBottom align='center'
//       color="secondary" className={classes.headerTypography}>
//       Refer a trusted contact that would appreciate joining our community
//       and we'll add them to our waitlist
//     </Typography>
//   </Grid>
//
//   <Grid container className={classes.root}
//     justify="center" alignItems="center" spacing={24}>
//
//     <Grid item xs={10} sm={4} justify="center" alignItems="center">
//       <Typography variant="h6" gutterBottom align='center'
//         color="secondary" className={classes.headerTypography}>
//         Choose network to refer
//       </Typography>
//
//       <FormControl className={classes.formControl} fullWidth>
//         <Select
//           value={this.props.network}
//           onChange={this.props.handleChange}
//           name="age"
//           displayEmpty
//           className={classes.selectEmpty}
//         >
//           <MenuItem value=''>All Bridgekin</MenuItem>,
//           <MenuItem value='The Battery'>The Battery</MenuItem>,
//         </Select>
//         <FormHelperText>Networks</FormHelperText>
//       </FormControl>
//
//       <div className={classes.wrapper}>
//         <Button variant="contained" color='secondary' fullWidth
//           className={classes.refButton}>
//           Create Link
//         </Button>
//       </div>
//     </Grid>
//
//     <Grid item xs={10} sm={4} justify="center" alignItems="center">
//       <TextField
//       required
//       id="outlined-required"
//       placeholder='Link displays here'
//       className={classes.textField}
//       margin="normal"
//       fullWidth
//       value={this.props.referralLink}
//       />
//     </Grid>
//
//   </Grid>
//
// </Grid>
