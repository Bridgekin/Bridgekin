import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import copy from 'copy-to-clipboard';

import { createReferral } from '../../actions/referral_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  referral: state.entities.referral,
});

const mapDispatchToProps = dispatch => ({
  createReferral: (referral) => dispatch(createReferral(referral))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    // padding: "40px 0px",
    // borderTop: `0.5px solid ${theme.palette.grey1}`
  },
  headerTypography:{
    margin: "25px 0px 25px 0px"
  },
  refButton:{
    // fontSize: '1rem',
    // fontWeight: 500,
    marginTop: 25,
    // height: 55,
    // width: 100
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  cardHeader:{
    fontSize: 14,
    fontWeight: 600
  },
  textfieldInput:{
    padding: "10px 14px"
  },
});

class OpportunityReferral extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      getLink: false,
      copied: false
    }

    this.handleCopy = this.handleCopy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCopy(link){
    return () => {
      copy(link);
      this.setState({ copied: true })
    }
  }

  handleSubmit(){
    // const { getLink } = this.state;
    this.props.createReferral({
      network_id: this.props.currentNetworkId
    })
    .then(() => this.setState({ getLink: true, copied: false }) );
  }

  render(){
    const { loading, classes, referral, currentNetworkId} = this.props;
    const { copied } = this.state;

    let referralLink = referral.referralCode ?
    (`${window.location.origin}/signup/${this.props.referral.referralCode}`) : ('')

    return(
      <Grid container className={classes.root}
        justify="flex-start" alignItems="center" >

        <Grid item xs={12}>
          <TextField
            id="outlined-read-only-input"
            placeholder='Link displays here'
            className={classes.textField}
            margin="normal"
            fullWidth
            value={referralLink}
            variant='outlined'
            InputProps={{
              readOnly: true,
              classes:{
                input: classes.textfieldInput
              }
            }}
            />
        </Grid>
        <Grid item xs={12} container justify='flex-end'
          style={{ marginTop: 10}}>
          <Button variant="contained" color='primary'
            onClick={this.handleSubmit}
            style={{ marginRight: 10, padding: "6px 10px"}}>
            Create Link
          </Button>
          <Button variant="contained" disabled={!referralLink || !currentNetworkId}
            onClick={this.handleCopy(referralLink)}
            style={{ padding: "6px 10px"}}>
            { copied ? 'Copied!' : 'Copy'}
          </Button>
        </Grid>
      </Grid>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityReferral));
