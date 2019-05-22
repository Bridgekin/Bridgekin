import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import ContactCard from './contact_card';
import FeedCard from '../feed_card';
import ImportGoogle from '../google/import_contacts';

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
  emptyOppsText:{
    fontSize: 20,
    fontWeight: 500,
    margin: 10,
    [theme.breakpoints.up('sm')]: {
      margin: 30,
    },
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
    const { classes, pathName } = this.props;
    let connections = this.filterConnections();
    let connectionCards = connections.map(contact => (
      <FeedCard
        contents={<ContactCard contact={contact} internal connected/>}
        />
    ))

    let noContactMessage = {
      '/mynetwork/invitations': 'You don’t have any new invitations',
      '/mynetwork/pending': 'You don’t have any outstanding invitations sent',
      '/mynetwork': 'You don’t have any trusted contacts yet'
    }

    return (
      <div>
        {connectionCards.length > 0 ? connectionCards :
          (<Typography variant="h3" color="textSecondary" align='center'
            className={classes.emptyOppsText} gutterBottom>
            {noContactMessage[pathName]}
          </Typography>)}
        {(false && pathName === '/mynetwork') && <ImportGoogle asContactCard/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Contacts)));
