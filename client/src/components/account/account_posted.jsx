import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddSharp';

import OpportunityCard from '../opportunity/opportunity_card';
// import CardModal from './card_modal';

import { fetchUserOpportunities, deleteOpportunity } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunityErrors: state.errors.opportunities,
  opportunities: Object.values(state.entities.opportunities).reverse(),
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
  addOportunityCard:{
    height: 390,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
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
    // console.log('delete Opportunity', id)
    this.props.deleteOpportunity(id)
  }

  render(){
    const { classes, opportunities }= this.props;
    if (this.state.loaded){
      let opportunityCards = opportunities.map(opportunity => (
        <Grid item xs={12} sm={6} md={4} justify="center" alignItems="center"
          className={classes.gridItem}>
          <OpportunityCard opportunity={opportunity}
            classes={classes}
            handleDelete={this.handleDelete}
            editable={true}/>
        </Grid>
      ));

      let opportunityGrid = (
        <Grid container justify="center" alignItems="center" spacing={24}>
          <Grid item xs={11} className={classes.gridOpp} >
            <Grid container className={classes.root}
              justify="flex-start" alignItems="center" spacing={16}>
              {opportunityCards}

              <Grid item xs={12} sm={6} md={4} justify="center"
                alignItems="center" >
                <Card>
                  <CardActionArea className={classes.addOportunityCard}
                    onClick={() => this.props.history.push('/postopportunity')}>
                    <AddIcon style={{ fontSize: 150 }}/>
                    <Typography variant="h3" gutterBottom align='center'>
                      Add Opportunity
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>

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
