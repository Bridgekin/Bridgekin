import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  acccountMain:{
    marginTop: 50
  },
});


class AccountSettings extends React.Component {
  render(){
    const { classes }= this.props;

    return (
      <Grid container className={classes.root}>

        <Grid className={classes.accountMain} container spacing={24} justify="center" alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h1" gutterBottom>
              Settings Section
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}

export default withStyles(styles)(AccountSettings);
