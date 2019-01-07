import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import blankProfilePic from '../../static/blank_profile_pic.png';

import { fetchOpportunities } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';

import OpportunityCard from '../opportunity/opportunity_card';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunityErrors: state.errors.opportunities,
  opportunities: Object.values(state.entities.opportunities),
});

const mapDispatchToProps = dispatch => ({
  fetchOpportunities: (networkId) => dispatch(fetchOpportunities(networkId)),
  fetchNetworks: () => dispatch(fetchNetworks()),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  },
});

class AccountPosted extends React.Component {
  render(){
    const { classes }= this.props;

    return (
      <Grid container justify="center" alignItems="center"
        spacing={24} className={classes.root}>
        <Grid item xs={10} sm={5} className={classes.homeContainer}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={blankProfilePic}
              title="Account Profile Picture"
            />
            <CardContent>
              <div className={classes.wrapper}>
                <Typography variant="h3" gutterBottom color="secondary"
                  align='left'>
                  Joe Lopardo
                </Typography>
                <div>
                  <i className={["far fa-edit", classes.cardEditIcon].join(' ')}/>
                </div>
              </div>
              <Typography variant="subtitle1" gutterBottom align='left'
                color="secondary" className={classes.cardSection}>
                Title
              </Typography>
              <Typography variant="h6" gutterBottom align='left'
                color="default">
                CEO & COO
              </Typography>
              <Typography variant="subtitle1" gutterBottom align='left'
                color="secondary" className={classes.cardSection}>
                Company
              </Typography>
              <Typography variant="h6" gutterBottom align='left'
                color="default">
                Bridgekin
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountPosted));
