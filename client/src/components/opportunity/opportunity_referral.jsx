import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class OpportunityReferral extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let classes = this.props.classes;

    return(
      <Grid container className={classes.root}
        justify="center" alignItems="center" spacing={24}>

        <Grid item xs={9} justify="flex-end" alignItems="center">
          <Typography variant="h4" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            Refer a trusted contact that would appreciate joining our community
            and we'll add them to our waitlist
          </Typography>
        </Grid>

        <Grid container className={classes.root}
          justify="center" alignItems="center" spacing={24}>

          <Grid item xs={10} sm={4} justify="center" alignItems="center">
            <Typography variant="h6" gutterBottom align='center'
              color="secondary" className={classes.headerTypography}>
              Choose network to refer
            </Typography>

            <FormControl className={classes.formControl} fullWidth>
              <Select
                value={this.props.network}
                onChange={this.props.handleChange}
                name="age"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=''>All Bridgekin</MenuItem>,
                <MenuItem value='The Battery'>The Battery</MenuItem>,
              </Select>
              <FormHelperText>Networks</FormHelperText>
            </FormControl>

            <div className={classes.wrapper}>
              <Button variant="contained" color='secondary' fullWidth
                className={classes.refButton}>
                Create Link
              </Button>
            </div>
          </Grid>

          <Grid item xs={10} sm={4} justify="center" alignItems="center">
            <TextField
            required
            id="outlined-required"
            placeholder='Link displays here'
            className={classes.textField}
            margin="normal"
            fullWidth
            value={this.props.referralLink}
            />
          </Grid>

        </Grid>

      </Grid>
    )
  }
};

export default OpportunityReferral;
