import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilitySensor from 'react-visibility-sensor';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Img from 'react-image'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { updateConnection, deleteConnection }
  from '../../actions/connection_actions';

import InviteModal from '../connections/invite_modal';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.entities.connections
});

const mapDispatchToProps = dispatch => ({
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: (id) => dispatch(deleteConnection(id)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  userCard:{
    flexGrow: 1,
    height: 55,
    position: 'relative'
  },
  profilePic: {
    height: 'auto',
    width: '100%',
    objectFit: 'cover'
  },
  listItemText: { color: theme.palette.text.primary },
  horizIcon: { color: theme.palette.text.primary},
  desktopOptions:{
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  mobileOptions:{
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  }
})

class ContactCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      inviteModalOpen: false
    }

    this.handleMenuClick = this.handleMenuClick.bind(this);
    // this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.getSecondaryAction = this.getSecondaryAction.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.acceptConnection = this.acceptConnection.bind(this);
    this.openInvite = this.openInvite.bind(this);
    this.closeInvite = this.closeInvite.bind(this);
  }

  // handleRemoveUser(){
  //   const{ networkId, user } = this.props;
  //   this.props.removeMemberUser(networkId, user.id)
  //   .then(() => this.setState({ anchorEl: null }))
  // }

  handleMenuClick(anchor){
    return e => {
      // this.setState({ [anchor]: e.currentTarget})
      const anchorEl = this.state[anchor];
      this.setState({ [anchor]: anchorEl ? null : e.currentTarget})
    }
  }

  acceptConnection(){
    this.props.updateConnection({
      status: 'Accepted',
      id: this.props.connection.id
    })
  }

  removeConnection(e){
    this.props.deleteConnection(this.props.connection.id)
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  openInvite(){
    this.setState({ inviteModalOpen: true })
  }

  closeInvite(){
    this.setState({ inviteModalOpen: false })
  }

  getSecondaryAction(){
    const { classes, contact, currentUser,
      search, connections } = this.props;
    const { contactAnchorEl, inviteAnchorEl } = this.state;

    if(search){
      let connected = Object.values(connections).filter(x =>(
          (x.userId === currentUser.id && x.friendId === contact) ||
          (x.friendId === currentUser.id && x.userId === contact)
        ))

      if(connected.length > 0 && connected[0].status === 'Accepted'){
        return (
          <Typography align='left' color='textPrimary'
            style={{ fontSize: 14, fontWeight: 600, marginRight: 20}}>
            {`My Contact`}
          </Typography>
        )
      } else if(connected.length > 0 && connected[0].status === 'Pending'){
        return (
          <Typography align='left' color='textPrimary'
            style={{ fontSize: 14, fontWeight: 600, marginRight: 20}}>
            {`Pending Invite`}
          </Typography>
        )
      } else {
        return (
          <Button variant='contained' color='primary'
            onClick={this.openInvite}
            style={{ textTransform: 'capitalize'}}>
            {`Add Contact`}
          </Button>
        )
      }
    } else {
      switch (contact.status) {
        case 'Accepted':
        return (
          <ListItemSecondaryAction>
            <IconButton aria-label="More"
              onClick={this.handleMenuClick('contactAnchorEl')}>
              <MoreHorizIcon className={classes.horizIcon}/>
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={contactAnchorEl}
              open={Boolean(contactAnchorEl)}
              onClose={this.handleMenuClick('contactAnchorEl')}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              >
              <MenuItem onClick={this.removeConnection}>
                <DeleteIcon
                  style={{ marginRight: 3 }}/>
                {`Remove User`}
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        )
        case 'Pending':
        if(currentUser.id === contact.friendId){
          return (
            <ListItemSecondaryAction>
              <Grid container justify='flex-end'
                className={classes.desktopOptions}>
                <Button color='primary' variant='contained'
                  style={{ marginRight: 10 }}
                  onClick={this.acceptConnection}>
                  Accept
                </Button>
                <Button variant='contained'
                  onClick={this.removeConnection}>
                  Decline
                </Button>
              </Grid>

              <Grid container justify='flex-end'
                className={classes.mobileOptions}>
                <IconButton aria-label="More"
                  onClick={this.handleMenuClick('inviteAnchorEl')}>
                  <MoreHorizIcon className={classes.horizIcon}/>
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={inviteAnchorEl}
                  open={Boolean(inviteAnchorEl)}
                  onClose={this.handleMenuClick('inviteAnchorEl')}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  >
                  <MenuItem onClick={this.acceptConnection}>
                    {`Accept`}
                  </MenuItem>
                  <MenuItem
                    onClick={this.removeConnection}>
                    {`Decline`}
                  </MenuItem>
                </Menu>
              </Grid>
            </ListItemSecondaryAction>
          )
        } else {
          return (
            <ListItemSecondaryAction>
              <Button variant='contained'
                onClick={this.removeConnection}>
                Revoke
              </Button>
            </ListItemSecondaryAction>
          )
        };
        default:
        return <div></div>
      }
    }
  }

  render(){
    const { classes, users, currentUser,
      contact, search } = this.props;
    const { inviteModalOpen } = this.state;
    let user = {};

    if(search){
      user = users[contact]
    } else {
      let friend = (currentUser.id !== contact.userId) ?
      contact.userId : contact.friendId
      user = users[friend];
    }

    return (
      <Grid container className={classes.userCard}
        justify="center" alignItems="center">
          <ListItemAvatar>
            <Avatar>
              {user.profilePicUrl ? (
                <VisibilitySensor>
                  <Img src={user.profilePicUrl}
                    className={classes.profilePic}
                    />
                </VisibilitySensor>
              ):<PersonIcon />}
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            classes={{
              primary: classes.listItemText,
              secondary: classes.listItemText}}
            primary={`${this.capitalize(user.fname)} ${this.capitalize(user.lname)}`}
            secondary={`${user.email}`}
          />

        {this.getSecondaryAction()}

        <InviteModal
          open={inviteModalOpen}
          userId={user.id}
          handleClose={this.closeInvite}
          />
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactCard));
