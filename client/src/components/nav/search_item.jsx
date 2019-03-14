import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image'

import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';
import LoopIcon from '@material-ui/icons/Loop';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { openInvite } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.entities.connections
});

const mapDispatchToProps = dispatch => ({
  openInvite: userId => dispatch(openInvite(userId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  itemPic:{
    objectFit: 'cover',
    height: 'auto',
    width: '100%',
  }
})

class SearchTemplate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inviteModalOpen: false
    }

    this.handleProfilePage = this.handleProfilePage.bind(this);
    this.openInvite = this.openInvite.bind(this);
  }

  handleProfilePage(userId){
    return e => {
      e.stopPropagation();
      this.props.history.push(`/mynetwork/profile/${userId}`)
      this.props.closeMenu();
    }
  }

  openInvite(e){
    e.stopPropagation();
    this.props.openInvite(this.props.user.id)
  }

  getSecondaryAction(){
    const { currentUser, connections, user } = this.props;
    let connected = Object.values(connections).filter(x =>(
        (x.userId === currentUser.id && x.friendId === user.id) ||
        (x.friendId === currentUser.id && x.userId === user.id)
      ))

    if(connected.length > 0 && connected[0].status === 'Accepted'){
      return (<Grid container justify='center' alignItems='center'>
        <CheckIcon/>
      </Grid>)
    } else if(connected.length > 0 && connected[0].status === 'Pending'){
      return (<Grid container justify='center' alignItems='center'>
        <LoopIcon/>
      </Grid>)
    } else if(currentUser.id !== user.id){
      return (
        <IconButton onClick={this.openInvite}>
          <AddCircleIcon />
        </IconButton>
      )
    } else { return <div></div>}
  }

  render(){
    const { user, classes } = this.props;
    const { inviteModalOpen } = this.state;

    return (
      <MenuItem onClick={this.handleProfilePage(user.id)}
        style={{ height: 30 }}>
        <Grid container>
          <Grid item xs={10} container justify='space-between' alignItems='center'>
            <Grid item xs={2}>
              <Avatar
                style={{ height: 25, width: 25 }}>
                {user.profilePicUrl ? (
                  <VisibilitySensor>
                    <Img src={user.profilePicUrl}
                      className={classes.itemPic}
                      />
                  </VisibilitySensor>
                ):<PersonIcon />}
              </Avatar>
            </Grid>
            <Grid item xs={10} container direction='column'>
              <Typography variant="body1" align='left' color="textPrimary"
                noWrap
                style={{ fontSize: 12, fontWeight: 600, width:'100%', textTransform: 'capitalize'}}>
                {`${user.fname} ${user.lname}`}
              </Typography>
              <Typography variant="body1" align='left' color="textPrimary"
                noWrap
                style={{ fontSize: 12, fontWeight: 400, width:'100%', textTransform: 'capitalize'}}>
                {user.title && `${user.title} @ `}
                {user.company && `${user.company}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2} container alignItems='center' justify='center'>
            {this.getSecondaryAction()}
          </Grid>
        </Grid>
      </MenuItem>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SearchTemplate)));
