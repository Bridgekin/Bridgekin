import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import OpportunityCard from '../opportunity/opportunity_card';

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
      focusedNetwork: null
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.props.fetchUserOpportunities()
  }

  handleCardOpen(){
    console.log('open card to edit page')
  }

  handleDelete(id){
    return e => {
      console.log('delete Opportunity', id)
      this.props.deleteOpportunity(id)
    }
  }

  render(){
    const { classes, opportunities }= this.props;

    // let filteredOpportunities = opportunities.filter(o => o.status === "Approved")

    let opportunityCards = opportunities.map(opportunity => (
      <Grid item xs={6} justify="center" alignItems="center"
        className={classes.gridItem}>
        <OpportunityCard opportunity={opportunity}
          classes={classes}
          handleCardOpen={this.handleCardOpen}
          handleDelete={this.handleDelete}
          editable={true}/>
      </Grid>
    ));

    // let dropdown = (
    //   <FormControl className={classes.formControl}>
    //     <InputLabel shrink htmlFor="age-label-placeholder">
    //       Chosen Network
    //     </InputLabel>
    //     <Select
    //       value={focusedNetwork}
    //       onChange={this.handleNetworkChange}
    //       input={<Input name="chosen-network" id="age-label-placeholder" />}
    //       name="chosen-network"
    //     >
    //       {networks.map(network => (
    //         <MenuItem value={network.id}>
    //           {network.title}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // )

    // <Grid item xs={10} sm={8}  justify="flex-end" alignItems="center">
    //   <Typography variant="p" gutterBottom align='right'
    //     color="secondary">
    //     {dropdown}
    //   </Typography>
    // </Grid>

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
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountPosted));
