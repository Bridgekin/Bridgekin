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

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { fetchUserOpportunities,
  deleteOpportunity,
  fetchAllTouchedOpportunities } from '../../actions/opportunity_actions';
// import { fetchNetworks } from '../../actions/network_actions';
import { fetchConnectedOpportunities } from '../../actions/connected_opportunity_actions';
import { fetchSavedOpportunities } from '../../actions/saved_opportunity_actions';
import OpportunityCardFeed from '../opportunity/opportunity_card_feed';
// import OpportunityChangeModal from '../opportunity/opportunity_change_modal';
import merge from 'lodash/merge';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunities: state.entities.opportunities,
  userOpps: state.entities.userOpportunities,
  passedOpps: state.entities.passedOpportunities,
  connectedOpps: state.entities.connectedOpportunities,
  facilitatedOpps: state.entities.facilitatedOpportunities,
  savedOpportunities: state.entities.savedOpportunities,
  networks: Object.values(state.entities.networks),
  userOppPermissions: state.entities.userOppPermissions
});

const mapDispatchToProps = dispatch => ({
  fetchAllTouchedOpportunities: () => dispatch(fetchAllTouchedOpportunities()),
  fetchUserOpportunities: () => dispatch(fetchUserOpportunities()),
  fetchSavedOpportunities: () => dispatch(fetchSavedOpportunities()),
  // fetchNetworks: () => dispatch(fetchNetworks()),
  fetchConnectedOpportunities: () => dispatch(fetchConnectedOpportunities()),
  deleteOpportunity: (id) => dispatch(deleteOpportunity(id))
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  filterCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.base2}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.primary}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  loader:{ height: 200},
  oppFeedContainer:{
    [theme.breakpoints.up('sm')]: {
      // marginTop: 18,
    },
  },
  emptyOppsText:{
    fontSize: 30,
    fontWeight: 500,
    margin: 20
  },
  progress: { color: theme.palette.text.primary}
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
});


class AccountOpportunities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      // changModalOpen: false,
      focusedOpportunity: null
    };

    this.getOpportunities = this.getOpportunities.bind(this);
    // this.handleEditOpen = this.handleEditOpen.bind(this);
    // this.handleEditClose = this.handleEditClose.bind(this);
  }

  componentDidMount(){
    // this.props.fetchUserOpportunities()
    // .then(() => {
    //   this.props.fetchSavedOpportunities()
    //   .then(() => this.setState({ loaded: true}))
    // })
    this.props.fetchAllTouchedOpportunities()
    .then(() => this.setState({ loaded: true}))
  }

  componentDidUpdate(prevProps){
    // if(this.props.oppFilter === 'connected' &&
    //   prevProps.oppFilter !== this.props.oppFilter){
    //   this.props.fetchConnectedOpportunities()
    // } else if (this.props.oppFilter === 'referred' &&
    //   prevProps.oppFilter !== this.props.oppFilter){
    //   this.props.fetchUserOpportunities();
    // } else if (this.props.oppFilter === 'posted' &&
    //   prevProps.oppFilter !== this.props.oppFilter){
    //   this.props.fetchUserOpportunities();
    // }
  }

  // handleEditOpen(opportunity){
  //   return () => {
  //     this.setState({ changeModalOpen: true, focusedOpportunity: opportunity })
  //   }
  // }
  //
  // handleEditClose(){
  //   this.setState({ changeModalOpen: false })
  // }

  getOpportunities(){
    const { oppFilter, connectedOpps, facilitatedOpps, opportunities,
      userOpps, passedOpps } = this.props;

    switch(oppFilter){
      case 'connected':
        return [...connectedOpps].map(id => opportunities[id]);
      case 'referred':
        return [...facilitatedOpps].map(id => opportunities[id]);
      case 'passed':
        return [...passedOpps].map(id => opportunities[id])
      case 'saved':
        const { savedOpportunities } = this.props;
        return Object.values(savedOpportunities)
          .map(x => opportunities[x.opportunityId])
      default:
        return [];
    }
  }

  getUserOpps(){
    const { userOppPermissions, opportunities } = this.props;

    let uniqPerms = Object.values(userOppPermissions).reduce((acc, perm) => {
      if (acc[perm.opportunityId]){
        let hash = acc[perm.opportunityId];
        if (perm.shareableType === 'Connection' && !perm.mass){
          hash.sharePerms.direct.push(perm.shareableId)
        } else if (perm.shareableType === 'Connection' && perm.mass){
          hash.sharePerms.indirect.push(perm.shareableId)
        } else if (perm.shareableType === 'Network'){
          hash.sharePerms.network.push(perm.shareableId)
        }

      } else {
        let value = merge({}, perm);
        if (perm.shareableType === 'Connection' && !perm.mass){
          value.sharePerms = merge({},{'direct':[value.shareableId], 'indirect':[], 'network':[] });
        } else if (perm.shareableType === 'Connection' && perm.mass){
          value.sharePerms = merge({}, {'indirect':[value.shareableId], 'direct':[], 'network':[] });
        } else if (perm.shareableType === 'Network'){
          value.sharePerms = merge({}, {'network':[value.shareableId], 'indirect':[], 'direct':[] });
        }
        acc[perm.opportunityId] = value;
      }
      return acc
    },{})

    return Object.values(uniqPerms).map(perm => ({
        opp: opportunities[perm.opportunityId],
        perm
      }))
      .sort((a,b) => (new Date(b.opp.createdAt)) - (new Date(a.opp.createdAt)))
      .map(({ opp, perm }) => <OpportunityCardFeed
        opportunity={opp}
        permission={perm}
        showPerms={true}/>
      )
  }

  render (){
    const { classes, currentUser, oppFilter } = this.props;
    const { loaded, focusedOpportunity, changeModalOpen } = this.state;

    // const formattedNetworks = networks.map(network => (
    //   Object.assign({}, network, {type: 'network'})
    // ))


    // let opportunityCards = filteredOpportunities.map(opportunity => (
    //   <OpportunityCardFeed
    //     currentUser={currentUser}
    //     opportunity={opportunity}
    //     editable={oppFilter === 'posted'}
    //     />
    // ));

    if (loaded){
      let opportunityCards = oppFilter === 'posted' ? (
        this.getUserOpps()
      ) : (
        this.getOpportunities().map(opportunity => (
          <OpportunityCardFeed
            currentUser={currentUser}
            opportunity={opportunity}
            passed={oppFilter === 'passed'}
            editable={oppFilter === 'posted'}
            />
        ))
      )

      return (
        <Grid container justify='center' alignItems='center'
          className={classes.oppFeedContainer}>
          <div style={{ overflow: 'scroll', paddingBottom: 50,
            width: '100%'}}>
            {opportunityCards.length > 0 ? opportunityCards : (
                <Typography variant="h3" gutterBottom color="textSecondary"
                  align='center' className={classes.emptyOppsText}>
                  {`You haven't ${oppFilter} any opportunities yet`}
                </Typography>
              ) }
          </div>

          {/*<OpportunityChangeModal
            open={changeModalOpen}
            handleClose={this.handleEditClose}
            currentUser={currentUser}
            opportunity={focusedOpportunity}
            type={'update'}
            />*/}
        </Grid>
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
