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

  render(){
    const { notification, classes, users } = this.props;
    let actor = users[notification.actorId]

    let card = (
      <Grid container alignItems="center"
        onClick={this.handleNotificationRedirect}>
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

        <Typography align='left' color='textPrimary'
          style={{ fontSize: 14, fontWeight: 600 }}>
          {`${notification.message}`}
        </Typography>
      </Grid>
    )

    return <FeedCard contents={card} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(NotificationCard)));
