import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FeedCard from '../feed_card';
import Loading from '../loading';
import merge from 'lodash/merge';

import { fetchNotifications, updateAsRead } from '../../actions/notification_actions';
import NotificationCard from './notification_card';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  notifications: state.entities.notifications
});

const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(fetchNotifications()),
  updateAsRead: (ids) => dispatch(updateAsRead(ids)),
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
  // switchBar: { backgroundColor: 'black'}
})

class Notifications extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.fetchNotifications()
    .then(() => {
      const { notifications } = this.props;
      let unreadIds = Object.values(notifications).filter(x => !x.readAt)
        .map(notification => notification.id);

      this.props.updateAsRead(unreadIds)
      .then(() => this.setState({ loaded: true }))
    })

    // this.setState({ loaded: true });
  }

  render(){
    const { classes, notifications } = this.props;
    const { loaded } = this.state;

    if (loaded){
      let notificationCards = Object.values(notifications).sort((a,b) => (
          (new Date(b.createdAt)) - (new Date(a.createdAt))
        )).map(notification => (
          <NotificationCard notification={notification} />
        ))

      let notificationsPage = (
        <div>
          {/*<Grid container justify='flex-end'
            style={{ marginBottom: 20 }}>
            <Button color='default' variant='contained'
              onClick={() => this.props.history.push("/account/settings/notifications")}>
              {`Edit Notification Settings`}
            </Button>
          </Grid>*/}

          {notificationCards.length > 0 ? notificationCards :
            (<Typography variant="h3" color="textSecondary" align='center'
                className={classes.emptyOppsText} gutterBottom>
                {`You don’t have any new notifications`}
              </Typography>)}
        </div>
      )

      return (<div>
        {notificationsPage}
      </div>)
    } else {
      return <Loading />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notifications));
