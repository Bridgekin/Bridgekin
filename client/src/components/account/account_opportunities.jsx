import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route , withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../../util/route_util';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { fetchUserOpportunities, deleteOpportunity } from '../../actions/opportunity_actions';
// import { fetchNetworks } from '../../actions/network_actions';
import { fetchConnectedOpportunities } from '../../actions/connected_opportunity_actions';
import OpportunityCardFeed from '../opportunity/opportunity_card_feed';
import OpportunityChangeModal from '../opportunity/opportunity_change_modal';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunities: state.entities.opportunities,
  userOpps: state.entities.userOpportunities,
  connectedOpps: state.entities.connectedOpportunities,
  facilitatedOpps: state.entities.facilitatedOpportunities,
  networks: Object.values(state.entities.networks),
});

const mapDispatchToProps = dispatch => ({
  fetchUserOpportunities: () => dispatch(fetchUserOpportunities()),
  // fetchNetworks: () => dispatch(fetchNetworks()),
  fetchConnectedOpportunities: () => dispatch(fetchConnectedOpportunities()),
  deleteOpportunity: (id) => dispatch(deleteOpportunity(id))
});

const styles = {
  root: {
    flexGrow: 1
  },
  filterCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.lightGrey}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.grey1}`,
  },
  loader:{ height: 200},
  oppFeedContainer:{
    [theme.breakpoints.up('sm')]: {
      marginTop: 18,
    },
  },
  emptyOppsText:{
    fontSize: 30,
    fontWeight: 500,
    margin: 20
  }
  // opportunityCard:{
  //   marginTop: 18,
  //   backgroundColor: `${theme.palette.white}`,
  //   width: '100%',
  //   borderRadius: 5,
  //   border: `1px solid ${theme.palette.lightGrey}`
  // },
  // oppStatus:{
  //   height: 29,
  //   width: 89,
  //   textTransform: 'uppercase',
  //   backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
};


class AccountOpportunities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      changModalOpen: false,
      focusedOpportunity: null
    };

    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
  }

  componentDidMount(){
    this.props.fetchUserOpportunities()
    .then(() => this.setState({ loaded: true}))

    // this.props.fetchNetworks()
  }

  componentDidUpdate(prevProps){
    if(prevProps.oppFilter === 'posted' &&
      prevProps.oppFilter !== this.props.oppFilter){
      this.props.fetchConnectedOpportunities()
    } else if (this.props.oppFilter === 'posted' &&
      prevProps.oppFilter !== this.props.oppFilter){
      this.props.fetchUserOpportunities();
    }
  }

  handleEditOpen(opportunity){
    return () => {
      this.setState({ changeModalOpen: true, focusedOpportunity: opportunity })
    }
  }

  handleEditClose(){
    this.setState({ changeModalOpen: false })
  }

  getOpportunities(){
    const { oppFilter, connectedOpps, facilitatedOpps, opportunities,
      userOpps } = this.props;

    switch(oppFilter){
      case 'connected':
        return [...connectedOpps].reverse().map(id => opportunities[id]);
      case 'referred':
        return [...facilitatedOpps].reverse().map(id => opportunities[id]);
      case 'posted':
        return [...userOpps].reverse().map(id => opportunities[id])
      default:
        return [];
    }
  }

  render (){
    const { classes, currentUser, oppFilter } = this.props;
    const { loaded, focusedOpportunity, changeModalOpen } = this.state;

    // const formattedNetworks = networks.map(network => (
    //   Object.assign({}, network, {type: 'network'})
    // ))

    let filteredOpportunities = this.getOpportunities();

    let opportunityCards = filteredOpportunities.map(opportunity => (
      <OpportunityCardFeed
        currentUser={currentUser}
        opportunity={opportunity}
        editable={oppFilter === 'posted'}
        handleEditOpen={this.handleEditOpen(opportunity)}
        />
    ));

    if (loaded){
      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container justify='center' alignItems='center'
            className={classes.oppFeedContainer}>
            <div style={{ overflow: 'scroll', paddingBottom: 50,
              width: '100%'}}>
              {filteredOpportunities.length > 0 &&
                opportunityCards.length > 0 ? opportunityCards : (
                  <Typography variant="h3" gutterBottom color="textSecondary"
                    align='center' className={classes.emptyOppsText}>
                    {`You haven't ${oppFilter} any opportunities yet`}
                  </Typography>
                ) }
            </div>

            <OpportunityChangeModal
              open={changeModalOpen}
              handleClose={this.handleEditClose}
              currentUser={currentUser}
              opportunity={focusedOpportunity}
              type={'update'}
              />
          </Grid>
        </MuiThemeProvider>
      )
    } else {
      return (
        <Grid container justify='center' alignItems='center'
          className={classes.loader}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountOpportunities));
