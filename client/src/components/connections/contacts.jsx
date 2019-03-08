import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import ContactCard from './contact_card';
import FeedCard from '../feed_card';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.entities.connections
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class Contacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.filterConnections = this.filterConnections.bind(this);
  }

  filterConnections(){
    const { connections, pathName, currentUser } = this.props;
    // const pathName = this.props.location.pathname;
    switch (pathName) {
      case '/mynetwork/invitations':
        return Object.values(connections).filter(x => (
          x.status === 'Pending' && x.friendId === currentUser.id ))
      case '/mynetwork/pending':
        return Object.values(connections).filter(x => (
          x.status === 'Pending' && x.userId === currentUser.id ))
      case '/mynetwork':
        return Object.values(connections).filter(x => (
          x.status === 'Accepted'))
      default:
        return <div></div>
    }

  }

  render(){
    let connections = this.filterConnections();
    let connectionCards = connections.map(contact => (
      <FeedCard
        contents={<ContactCard contact={contact} />}
        />
    ))

    return (
      <div>
        {connectionCards}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Contacts)));
