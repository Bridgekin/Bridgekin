import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import OpportunityCard from '../opportunity/opportunity_card';
import CardModal from '../opportunity/card_modal';

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
    margin: 25
  }
});

class SubmitField extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cardOpen: false,
    }

    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleCardClose = this.handleCardClose.bind(this);
  }

  handleCardOpen(){
    console.log('opening card')
    this.setState({ cardOpen: true });
  }

  handleCardClose(){
    this.setState({ cardOpen: false });
  }

  render (){
    const { classes, errors } = this.props;
    const { title, description, industry, need, geography,
      value, networks } = this.props;
    const { cardOpen } = this.state;

    let opportunityNeeds = need;
    let industries = industry;

    let opportunity = { title, description, industries, opportunityNeeds,
      geography, value, networks };


    let errorItems = errors.map(error => (
      <li className={classes.errors}>
        {error}
      </li>
    ))

    return (
      <Grid container className={classes.root}
        justify='center' alignItems='center'>

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

        <Grid item xs={10}>
          <OpportunityCard opportunity={opportunity}
            classes={classes}
            handleCardOpen={this.handleCardOpen}
            editable={false}/>
        </Grid>

        <Grid item xs={12} className={classes.disclaimer}>
          <Typography variant="p" gutterBottom align='left'
            color='default' className={classes.disclaimerTypography}>
            This is the final version of your opportunitity. It will be reviewed
            and go live within <strong>36 hours</strong>.
          </Typography>
          <Typography variant="p" gutterBottom align='left'
            color='default' className={classes.disclaimerTypography}>
            When a member connects to your opportunity, you will receive
            an email introducing you to each other.
          </Typography>
          <Typography variant="p" gutterBottom align='left'
            color='default' className={classes.disclaimerTypography}>
            If you need to edit this opportunity, click the back button.
          </Typography>
        </Grid>

        <CardModal open={cardOpen}
          handleClose={this.handleCardClose}
          opportunity={opportunity}
          demo={true}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(SubmitField);
