import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import OpportunityCard from '../opportunity/opportunity_card';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardGrid:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  errors: {
    color: 'red'
  },
  disclaimer: {
    marginTop: 40,
    paddingTop: 10,
    borderTop: '1px solid #D3D3D3'
  },
  disclaimerTypography: {
    margin: "25px 0px"
  },
  header: { color: theme.palette.darkGrey}
});

class SubmitField extends React.Component {

  render (){
    const { title, description, industries, opportunityNeed,
      geography, value, networks, classes, errors, status,
      availNetworks, pictureUrl } = this.props;

    let opportunity = { title, description, industries, opportunityNeed,
      geography, value, networks, status, pictureUrl };

    let errorItems = errors.map(error => (
      <li className={classes.errors}>
        {error}
      </li>
    ))

    let networksTitles = networks.map(network => (
      <li>
        {availNetworks[network].title}
      </li>
    ))

    return (
      <Grid container className={classes.root}
        justify='center' alignItems='flex-start' spacing={16}>

        <Grid item xs={11} sm={10} md={8}>
          <Typography variant="h1" gutterBottom align='left'
            color='textPrimary' className={classes.header}>
            {`Opportunity Preview`}
          </Typography>
        </Grid>

        <Grid item xs={11} container justify='center'  >
          {(errors.length > 0) && (
            <div>
              <Typography variant="h6" gutterBottom align='left'
                className={classes.industryHeader} color='secondary'>
                Seems like you're missing a few fields:
              </Typography>
              <ul>
                {errorItems}
              </ul>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={9} md={6}>
          <OpportunityCard opportunity={opportunity}
            classes={classes}
            editable={false}
            demo={true}/>
        </Grid>

        <Grid item xs={9} className={classes.disclaimer}>
          <Typography variant="h6" gutterBottom align='left'
            color='textPrimary'>
            {`Networks this opportunity will be shared with:`}
          </Typography>
          <ul>
            {networksTitles}
          </ul>

          <Typography variant="p" gutterBottom align='left'
            style={{ marginTop: 30}}
            color='default' className={classes.disclaimerTypography}>
            This is the final version of your opportunitity. It will be reviewed
            and go live within <strong>24 hours</strong>.
          </Typography>
          <Typography variant="p" gutterBottom align='left'
            color='default' className={classes.disclaimerTypography}>
            When a member connects to your opportunity, you will receive
            an email introducing you to each other.
          </Typography>
          <Typography variant="p" gutterBottom align='left'
            color='default' className={classes.disclaimerTypography}>
            {`If you need to edit this opportunity, click the back button.
              You can also edit once live on the “My Account” tab.`}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(SubmitField);
