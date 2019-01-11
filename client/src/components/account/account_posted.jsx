import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import OpportunityCard from '../opportunity/opportunity_card';
// import CardModal from './card_modal';

import { fetchUserOpportunities, deleteOpportunity } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunityErrors: state.errors.opportunities,
  opportunities: Object.values(state.entities.opportunities),
  networks: Object.values(state.entities.networks)
});

const mapDispatchToProps = dispatch => ({
  fetchUserOpportunities: (networkId) => dispatch(fetchUserOpportunities(networkId)),
  fetchNetworks: () => dispatch(fetchNetworks()),
  deleteOpportunity: (id) => dispatch(deleteOpportunity(id))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 35
  },
});

class AccountPosted extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opportunitiesLoaded: false,
      focusedNetwork: null,
      loaded: false
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.props.fetchUserOpportunities()
    .then(() => this.setState({ loaded: true}))
  }

  handleCardOpen(){
    console.log('open card to edit page')
  }

  handleDelete(id){
    console.log('delete Opportunity', id)
    // this.props.deleteOpportunity(id)
  }

  render(){
    const { classes, opportunities }= this.props;
    if (this.state.loaded){
      let opportunityCards = opportunities.map(opportunity => (
        <Grid item xs={10} md={6} lg={5} justify="center" alignItems="center"
          className={classes.gridItem}>
          <OpportunityCard opportunity={opportunity}
            classes={classes}
            handleDelete={this.handleDelete}
            editable={true}/>
        </Grid>
      ));

      let opportunityGrid = (
        <Grid container justify="center" alignItems="center" spacing={24}>
          <Grid item xs={10} sm={10} className={classes.gridOpp} >
            <Grid container className={classes.root}
              justify="center" alignItems="center" spacing={24}>
              {opportunityCards}
            </Grid>
          </Grid>
        </Grid>
      )

      return (
        <Grid container className={classes.root}>
          {opportunityGrid}
        </Grid>
      )
    }
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountPosted));
