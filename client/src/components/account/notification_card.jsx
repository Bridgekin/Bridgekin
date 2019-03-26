import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image'

import PersonIcon from '@material-ui/icons/Person';
import FeedCard from '../feed_card';
import datetimeDifference from "datetime-difference";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  profilePic: {
    height: 'auto',
    width: '100%',
    objectFit: 'cover'
  },
})

class NotificationCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
    this.handleNotificationRedirect = this.handleNotificationRedirect.bind(this);
  }

  handleNotificationRedirect(e){
    e.stopPropagation();
    const { notification } = this.props;
    if(notification.actedWithType === "Opportunity"){
      if(notification.action !== "posted"){
        this.props.history.push('/findandconnect/direct-connections')
      } else {
        this.props.history.push('/findandconnect')
      }
    } else if(notification.actedWithType === "Connection"){
      if(notification.action === "invited"){
        this.props.history.push('/mynetwork/invitations')
      }
    }
  }

  handleNotificationDate(){
    let then = new Date(this.props.notification.createdAt);
    const result = datetimeDifference(then, new Date());
    const resultKey = Object.keys(result)
      .filter(k => !!result[k])[0]
    return `${result[resultKey]}${resultKey.slice(0,1)}`
  }

  render(){
    const { notification, classes, users } = this.props;
    let actor = users[notification.actorId]

    let card = (
      <Grid container alignItems="center"
        onClick={this.handleNotificationRedirect}>
        <Grid item xs={3} sm={2}>
          <Avatar
            style={{ marginRight: 15}}>
            {actor.profilePicUrl ? (
              <VisibilitySensor>
                <Img src={actor.profilePicUrl}
                  className={classes.profilePic}
                  />
              </VisibilitySensor>
            ):<PersonIcon />}
          </Avatar>
        </Grid>

        <Grid item xs={9} sm={8} md={6} container direction='column'>
          <Typography align='left' color='textPrimary'
            style={{ fontSize: 14, fontWeight: 600 }}>
            {`${notification.message}`}
          </Typography>
          <Typography align='left' color='textPrimary'
            style={{ fontSize: 11, textTransform: 'capitalize' }}>
            {this.handleNotificationDate()}
          </Typography>
        </Grid>
      </Grid>
    )

    return <FeedCard contents={card} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(NotificationCard)));
