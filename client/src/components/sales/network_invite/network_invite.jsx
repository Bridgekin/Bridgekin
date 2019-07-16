import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Loading from '../../loading';
import { fetchNetworkInvites, createNetworkInvites } from '../../../actions/sales_network_invites_actions';
import { openSalesNetworkInvite } from '../../../actions/modal_actions'
import Capitalize from 'capitalize';
import NetworkInviteCard from './network_invite_card';
import uniqId from 'uniqid';
import merge from 'lodash/merge';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  networkId: ownProps.match.params.networkId,
  networkAdminMap: state.entities.sales.networkAdminMap,
  salesUserNetworks: state.entities.sales.salesUserNetworks
});

const mapDispatchToProps = dispatch => ({
  fetchNetworkInvites: (networkId) => dispatch(fetchNetworkInvites(networkId)),
  createNetworkInvites: (payload) => dispatch(createNetworkInvites(payload)),
  openSalesNetworkInvite: (payload) => dispatch(openSalesNetworkInvite(payload))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64 + 15,
    paddingBottom: '10%'
  }, 
})

class NetworkInvite extends React.Component {
  constructor(props) {
    super(props)
    let newId = uniqId();
    this.state = {
      loaded: false,
      isAdmin: false,
      newInvites: {
        [newId]: { id: newId, email: '', fname: '', lname: '', userType: 'full'}
      },
      lastAddedIdx: 0
    }

    this.updateVariable  = this.updateVariable.bind(this)
    this.addAnotherUser = this.addAnotherUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.readyToSubmit = this.readyToSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const { networkId } = this.props;
    //Confirm that the user is an admin for this network
    this.props.fetchNetworkInvites(networkId)
    .then(() => {
      const { networkAdminMap, networkId, currentUser } = this.props;
      let admins = new Set(networkAdminMap[networkId] || []);
      if (admins.has(currentUser.id)){
        this.setState({ loaded: true, isAdmin: true })
      } else {
        this.setState({ loaded: true, isAdmin: false })
      }
    })
  }

  updateVariable(payload){
    const { newInvites } = this.state;
    let newData = merge({}, newInvites[payload.id])
    newData[payload.field] = payload.value
    newInvites[payload.id] = newData
    this.setState({ newInvites })
  }

  addAnotherUser(){
    const { newInvites } = this.state;
    let newId = uniqId();
    newInvites[newId] = {id: newId, email: '', fname: '', lname: '', userType: 'full'}
    this.setState({ newInvites })
  }

  deleteUser(id){
    const { newInvites } = this.state;
    delete newInvites[id]
    this.setState({ newInvites })
  }

  readyToSubmit(){
    const { newInvites } = this.state;
    let arr = Object.values(newInvites)
    for(let i = 0; i < arr.length; i++){
      let {email, fname, lname, userType} = arr[i];
      if (!email || !fname || !lname || !userType){
        return false
      }
    }
    return  true
  }

  handleSubmit(){
    const { networkId } = this.props;
    const { newInvites } = this.state;
    let payload = { networkId, newInvites: Object.values(newInvites) }
    this.props.createNetworkInvites(payload)
      .then(() => this.props.openSalesNetworkInvite({ page: 'response' }))
  }

  render() {
    const { dimensions, classes, salesUserNetworks, networkId } = this.props;
    const { loaded, isAdmin, newInvites } = this.state;

    if (loaded && isAdmin){
      let network = salesUserNetworks[networkId];
      let header = <Grid container justify='center'>
        <Typography color='textPrimary'
        style={{ fontSize: 40, marginBottom: 50}}>
          {`Invite Folks To ${Capitalize(network.title)}`}
        </Typography>
      </Grid>
      let inviteCards = Object.values(newInvites).map(data => {
        return <NetworkInviteCard idx={data.id} data={data} updateVariable={this.updateVariable} deleteUser={this.deleteUser}/>
      })
      return <Grid container justify='center' 
        alignItems='center'
        style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={8}>
          {header}
          {inviteCards}
          <Grid container style={{ margin: "15px 0px"}}>
            <Button variant='contained' color='primary'
            onClick={this.addAnotherUser}>
              {`Add Another User`}
            </Button>
          </Grid>
          <div>
            <Button variant='contained' color='primary'
              disabled={!this.readyToSubmit()} 
              onClick={this.handleSubmit}
              style={{textTrasform: 'none'}}>
              {`Send Invitations`}
            </Button>
          </div>
        </Grid>
      </Grid>
    } else if (loaded && !isAdmin){
      return <Grid container justify='center' alignItems='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={6}>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Access Denied`}
          </Typography>
          <Typography align='center' gutterBottom
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`Inviting more people is a great way to increase value from your team's social graph. However, only a network admin is allowed to send invitations `}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`Please reach out to your network admin to invite users. If you need any help, reach out to us at `}
            <a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a>
            {` for any additional questions.`} <br /><br />
            {`Thanks!`}
          </Typography>
        </Grid>
      </Grid>
    } else {
      return <Grid container justify='center'
        alignItems='center' style={{ minHeight: dimensions.height }}>
        <Loading />
      </Grid>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NetworkInvite));
