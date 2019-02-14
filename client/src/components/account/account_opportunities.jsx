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

import { fetchUserOpportunities, deleteOpportunity } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';
import OpportunityCardFeed from '../opportunity/opportunity_card_feed';
import { fade } from '@material-ui/core/styles/colorManipulator';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunities: Object.values(state.entities.opportunities).reverse(),
  connectedOpportunities: Object.values(state.entities.connectedOpportunities).reverse(),
  facilitatedOpportunities: Object.values(state.entities.facilitatedOpportunities).reverse(),
});

const mapDispatchToProps = dispatch => ({
  fetchUserOpportunities: (networkId) => dispatch(fetchUserOpportunities(networkId)),
  fetchNetworks: () => dispatch(fetchNetworks()),
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
      loaded: false
    };
  }

  componentDidMount(){
    this.props.fetchUserOpportunities()
    .then(() => this.setState({ loaded: true}))
  }

  componentDidUpdate(prevProps){
    if(prevProps.opp_filter === 'posted' &&
      prevProps.opp_filter !== this.props.opp_filter){
      this.props.fetchConnectedOpportunities()
    } else if (this.props.opp_filter === 'posted' &&
      prevProps.opp_filter !== this.props.opp_filter){
      this.props.fetchUserOpportunities();
    }
  }

  getOpportunities(){
    const { opp_filter, connectedOpportunities,
      facilitatedOpportunities, opportunities } = this.props;
    switch(opp_filter){
      case 'connected':
        return connectedOpportunities;
      case 'referred':
        return facilitatedOpportunities;
      case 'posted':
        return opportunities;
      default:
        return [];
    }
  }

  render (){
    const { classes, currentUser } = this.props;
    const { loaded } = this.state;
    
    let filteredOpportunities = this.getOpportunities();
    debugger

    let opportunityCards = filteredOpportunities.map(opportunity => (
      <OpportunityCardFeed
        currentUser={currentUser}
        opportunity={opportunity}
        classes={classes}
        editable={ true }/>
    ));

    if (loaded){
      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container justify='center' alignItems='center'>
            <div style={{ overflow: 'scroll',
              maxHeight: window.innerHeight, padding: "0px 0px 150px 0px"}}>
              {opportunityCards}
              <div style={{height: 150}} />
            </div>
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
