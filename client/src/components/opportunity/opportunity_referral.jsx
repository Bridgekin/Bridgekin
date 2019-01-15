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

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "15px 0px 15px 0px",
    borderTop: "1px solid #D3D3D3",
  },
  headerTypography:{
    margin: "25px 0px 25px 0px"
  },
  refButton:{
    fontSize: '1rem',
    fontWeight: 500,
    marginTop: 25,
    height: 55,
    width: 200
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
  render(){
    const { loading, classes, networks,
            referralNetwork, referral } = this.props;

    let options = networks.map(network => (
      <MenuItem value={network.id}>{network.title}</MenuItem>
    ));

    let referralLink = referral.referralCode ?
    (`${window.location.origin}/signup/${this.props.referral.referralCode}`) : ('')

    return(
      <Grid container
        className={classes.root}
        justify="center" alignItems="center" >

        <Grid item xs={9} justify="flex-end" alignItems="center"
          className={classes.container}>
          <Typography variant="h4" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            Create a referral link for your network!
          </Typography>
          <Typography variant="h5" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            When the click this link, they'll be invited to join Bridgekin
          </Typography>
        </Grid>

        <Grid container
          justify="center" alignItems="center" spacing={24}>

          <Grid item xs={10} sm={4} justify="center" alignItems="center">
            <Typography variant="h6" gutterBottom align='center'
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
              <FormHelperText>Networks</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={10} sm={4}>
            <div className={classes.wrapper}>
              <Button variant="contained" color='secondary' fullWidth
                className={classes.refButton}
                onClick={this.props.handleSubmit}>
                Create Link
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid container
          justify="center" alignItems="center" spacing={24}>
          <Grid item xs={10} sm={6} justify="center" alignItems="center">
            <TextField
              required
              id="outlined-required"
              placeholder='Link displays here'
              className={classes.textField}
              margin="normal"
              fullWidth
              value={referralLink}
              variant='filled'
              />
          </Grid>
        </Grid>

      </Grid>
    )
  }
};

export default withRouter((withStyles(styles)(OpportunityReferral)));
