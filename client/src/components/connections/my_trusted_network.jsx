import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route , withRouter } from 'react-router-dom';
// import { Link, NavLink, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {
  fetchConnections, updateConnection, deleteConnection
} from '../../actions/connection_actions';

import FeedContainer from '../feed_container';
import FeedCard from '../feed_card';
import Loading from '../loading';
import OpportunityWaitlist from '../opportunity/opportunity_waitlist';
// import Contacts from './contacts';
// import Requests from './requests';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.connections
});

const mapDispatchToProps = dispatch => ({
  fetchConnections: () => dispatch(fetchConnections()),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: (id) => dispatch(deleteConnection(id)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  loading:{
    position: 'relative',
    top: 200
  },
  filterCard:{
    // marginTop: 18,
    backgroundColor: theme.palette.base3,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.primary}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  filterHeader:{
    fontSize: 13,
    fontWeight: 500
  },
})

class MyTrustedNetwork extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.fetchConnections()
    .then(() => this.setState({ loaded: true }))
  }

  render(){
    const{ classes, connections, currentUser } = this.props;
    const { loaded } = this.state;
    let pathName = this.props.location.pathname;

    if (loaded){
      let column1 = (
        <FeedCard contents={
            <div>
              <Typography gutterBottom align='Left'
                className={classes.cardHeader} color='textSecondary'
                style={{ marginBottom: 20}}>
                Invite your trusted business contacts
              </Typography>

              <OpportunityWaitlist
                currentUser={currentUser}
                />
            </div>
          }/>
      )

      let pages = [
        {title: 'Invitations', dest: '/mytrustednetwork/invitations'},
        {title: `My Contacts`, dest: '/mytrustednetwork/contacts'},
      ]

      let filter = (
        <div className={classes.filterCard}>
          <Typography align='Left' color="textPrimary"
            className={classes.cardHeader}
            style={{ margin: "10px 15px 0px"}}>
            Connected Opportunities
          </Typography>

          <List component="nav">
            {pages.map(item => (
              <ListItem button className={classes.filterItem}
                onClick={() => this.props.history.push(item.dest)}
                selected={pathName === item.dest}>
                <Typography variant="body1" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {item.title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      )

      let feed = (
        <div>
          Feed
          <Switch>

          </Switch>
        </div>
      )

      return (
        <FeedContainer
          column1={column1}
          feed={feed}
          column2={filter}
          />
      )
    } else {
      return <div className={classes.loading}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyTrustedNetwork));
