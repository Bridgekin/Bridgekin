import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  // registerWaitlist: (user) => dispatch(registerWaitlist(user))
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  }
});

class OpportunityCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render (){
    let classes = this.props.classes;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root}>

          <Grid className={classes.homeHeader} container spacing={24} justify="center" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h1" gutterBottom>
                Create Opportunity
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityCreate));
