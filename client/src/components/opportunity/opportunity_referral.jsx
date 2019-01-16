import React from 'react';

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

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
    borderTop: `0.5px solid ${theme.palette.grey1}`
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
  }
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
    this.props.handleSubmit();
    this.setState({ getLink: true })
  }

  render(){
    const { loading, classes, networks,
            referralNetwork, referral } = this.props;
    const { copied } = this.state;

    let options = networks.map(network => (
      <MenuItem value={network.id}>{network.title}</MenuItem>
    ));

    let referralLink = referral.referralCode ?
    (`${window.location.origin}/signup/${this.props.referral.referralCode}`) : ('')

    return(
      <Grid container className={classes.root}
        justify="center" alignItems="center" >

        <Grid item xs={10} md={8} >
          <Typography variant="h5" gutterBottom align='left'
            color="secondary" className={classes.headerTypography}>
            {`Create a referral link for your network. When the click this link, they'll be invited to join Bridgekin.`}
          </Typography>
        </Grid>

        <Grid item xs={10} md={8} container justify="center" alignItems="center" spacing={24}>

          <Grid item xs={6} justify="center" alignItems="center">
            <Typography variant="h6" align='center'
              color="secondary" className={classes.headerTypography}>
              Choose network to refer
            </Typography>

            <FormControl className={classes.formControl} fullWidth>
              <Select
                value={referralNetwork}
                onChange={this.props.handleChange}
                name="age"
                displayEmpty
                className={classes.selectEmpty}
              >
                {options}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} container justify="center" alignItems="center">
            <Button variant="contained" color='secondary'
              className={classes.refButton}
              onClick={this.handleSubmit}>
              Create Link
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={10} md={8} container justify="center" alignItems="center"
          spacing={16} style={{ marginTop: 20}}>
          <Grid item xs={6}>
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
              }}
              />
          </Grid>

          <Grid item xs={3} container justify="center" alignItems="center">
            <Button variant="contained"
              onClick={this.handleCopy(referralLink)}
              style={{ backgroundColor: "#616161", color: '#FFF'}}>
              { copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </Grid>
        </Grid>

      </Grid>
    )
  }
};

export default withRouter((withStyles(styles)(OpportunityReferral)));
