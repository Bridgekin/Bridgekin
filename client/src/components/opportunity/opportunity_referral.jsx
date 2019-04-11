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
import Switch from '@material-ui/core/Switch';

import copy from 'copy-to-clipboard';
import { createReferral } from '../../actions/referral_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  workspaceOptions: state.entities.workspaceOptions,
  referral: state.entities.referral,
  networks: state.entities.networks,
});

const mapDispatchToProps = dispatch => ({
  createReferral: (referral) => dispatch(createReferral(referral)),
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
    padding: "10px 14px",
  },
  switchBase:{
    height: 30
  }
});

class OpportunityReferral extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      referralNetwork: '',
      getLink: false,
      copied: false,
      friendable: false,
      usageType: false
    }

    this.handleCopy = this.handleCopy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCopy(link){
    return () => {
      copy(link);
      this.setState({ copied: true })
    }
  }

  handleChange(field){
    return e => {
      if (field === 'friendable'){
        this.setState({ [field]: e.target.checked})
      } else {
        this.setState({ [field]: e.target.value})
      }
    }
  }

  handleSubmit(){

    this.props.createReferral({
      network_id: this.state.referralNetwork,
      is_friendable: this.state.friendable,
      usage_type: this.state.usageType ? 'Multi' : 'Single'
    },
    () => this.setState({ getLink: true, copied: false }))
  }

  render(){
    const { loading, classes, networks,
      referral, workspaceOptions } = this.props;
    const { copied, referralNetwork, friendable } = this.state;

    const networksArray = [...workspaceOptions]
      .filter(x => x.includes('Network'))
      .map(x => networks[x.split('-')[0]])

    let options = networksArray.map(network => (
      <MenuItem value={network.id}>{network.title}</MenuItem>
    ));

    let referralLink = referral.referralCode ?
    (`${window.location.origin}/signup/${this.props.referral.referralCode}`) : ('')

    return(
      <Grid container className={classes.root}
        justify="flex-start" alignItems="center" >

        <Grid item xs={12}>
          <Typography variant="h6" align='left'
            color="textSecondary" className={classes.cardHeader}>
            {`Create a referral link for your network`}
          </Typography>
        </Grid>

        <Grid item xs={12} container alignItems='center'>
          <Grid item xs={9}>
            <Typography variant="h6" align='left'
              color="textSecondary"
              style={{ fontSize: 12}}>
              {`Connect to user on signup`}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch
              checked={friendable}
              onChange={this.handleChange('friendable')}
              classes={{ switchBase: classes.switchBase}}
              />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems='center'>
          <Grid item xs={9}>
            <Typography variant="h6" align='left'
              color="textSecondary"
              style={{ fontSize: 12}}>
              {`Single-Use vs Multi-Use`}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch
              checked={friendable}
              onChange={this.handleChange('usageType')}
              classes={{ switchBase: classes.switchBase}}
              />
          </Grid>
        </Grid>
        <Grid container justify='flex-start' spacing={16}>
          <Grid item xs={12} container alignItems='center'>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                placeholder="Choose a network"
                value={referralNetwork}
                onChange={this.handleChange('referralNetwork')}
                name="age"
                displayEmpty
                className={classes.selectEmpty}>
                {options}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-read-only-input"
              placeholder='Link displays here'
              className={classes.textField}
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
        </Grid>
        <Grid item xs={12} container justify='space-around'
          style={{ marginTop: 10}}>
          <Button variant="contained" color='primary'
            onClick={this.handleSubmit}
            style={{ marginRight: 10}}>
            Create Link
          </Button>
          <Button variant="contained"
            onClick={this.handleCopy(referralLink)}>
            { copied ? 'Copied!' : 'Copy'}
          </Button>
        </Grid>
      </Grid>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withStyles(styles)(OpportunityReferral))));
