import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OpportunityChange from './opportunity_change';

import {fetchNetworks} from '../../actions/network_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  networks: state.entities.networks
});

const mapDispatchToProps = dispatch => ({
  fetchNetworks: () => dispatch(fetchNetworks())
});

const DEFAULTSTATE = {
  opportunityNeed: '',
  geography: [],
  industries: [],
  value: '',
  title: '',
  description: '',
  status: 'Pending',
  picture: null,
  pictureUrl: null,
  networks: [],
}

class OpportunityCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.fetchNetworks()
    .then(() => this.setState({ loaded: true }))
  }

  render(){
    const { networks } = this.props;

    if(this.state.loaded){
      return (
        <OpportunityChange
          opportunity={DEFAULTSTATE}
          availNetworks={networks}
          type={'create'}
          />
      )
    }
    return <div></div>
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunityCreate));
