import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OpportunityChange from './opportunity_change';

import { fetchNetworks } from '../../actions/network_actions';
import { fetchOpportunity } from '../../actions/opportunity_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networks: state.entities.networks,
  opportunity: state.entities.opportunities[ownProps.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  fetchNetworks: () => dispatch(fetchNetworks()),
  fetchOpportunity: id => dispatch(fetchOpportunity(id))
});


class OpportunityEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id
    this.props.fetchNetworks()
    this.props.fetchOpportunity(id)
    .then(() => this.setState({ loaded: true }))
  }

  render(){
    const { networks, opportunity } = this.props;

    if(this.state.loaded){
      return (
        <OpportunityChange
          opportunity={opportunity}
          availNetworks={networks}
          type={'update'}
          />
      )
    }
    return <div></div>
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunityEdit));
