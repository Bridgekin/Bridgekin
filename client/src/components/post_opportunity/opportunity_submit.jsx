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
            handleCardOpen={this.handleCardOpen} />
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
