import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckIcon from '@material-ui/icons/Check';
import LoopIcon from '@material-ui/icons/Loop';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

import { updateConnection, deleteConnection }
  from '../../actions/connection_actions';
import { openInvite } from '../../actions/modal_actions';
import { openCreateCircle, openCircle } from '../../actions/modal_actions';
import { addMember, removeMember } from '../../actions/circle_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.entities.connections,
  circles: state.entities.circles,
  circleConnections: state.entities.circleConnections,
  // circleMembers: state.entities.circleMembers
});

const mapDispatchToProps = dispatch => ({
  openInvite: userId => dispatch(openInvite(userId)),
  openCreateCircle: () => dispatch(openCreateCircle()),
  openCircle: circleId => dispatch(openCircle(circleId)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: (id) => dispatch(deleteConnection(id)),
  addMember: (circleId, memberId) => dispatch(addMember(circleId, memberId)),
  removeMember: (circleConnectionId) => dispatch(removeMember(circleConnectionId)),
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
  },
  borderBelow: { borderBottom: `1px solid ${theme.palette.border.primary}`}
})

class ContactCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      contactAnchorEl: null,
      inviteModalOpen: false,
      circleMenu: false
    }

    this.handleMenuClick = this.handleMenuClick.bind(this);
    // this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.getSecondaryAction = this.getSecondaryAction.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.acceptConnection = this.acceptConnection.bind(this);
    this.openInvite = this.openInvite.bind(this);
    this.handleProfilePage = this.handleProfilePage.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleToggleCircleMenu = this.handleToggleCircleMenu.bind(this);
    this.openCircle = this.openCircle.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.transformCircleConnections = this.transformCircleConnections.bind(this);
  }

  // handleRemoveUser(){
  //   const{ networkId, user } = this.props;
  //   this.props.removeMemberUser(networkId, user.id)
  //   .then(() => this.setState({ anchorEl: null }))
  // }

  handleMenuClick(anchor){
    return e => {
      // this.setState({ [anchor]: e.currentTarget})
      e.stopPropagation();
      const anchorEl = this.state[anchor];
      this.setState({
        [anchor]: anchorEl ? null : e.currentTarget,
        circleMenu: false
      })
    }
  }

  handleProfilePage(e){
    e.stopPropagation();
    this.props.history.push(`/mynetwork/profile/${this.getUser().id}`)
  }

  acceptConnection(e){
    e.stopPropagation();
    this.props.updateConnection({
      status: 'Accepted',
      id: this.props.contact.id
    })
  }

  removeConnection(e){
    e.stopPropagation();
    this.props.deleteConnection(this.props.contact.id)
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  openInvite(e){
    e.stopPropagation();
    this.props.openInvite(this.getUser().id)
  }

  handleToggleCircleMenu(e){
    e.stopPropagation();
    let { circleMenu } = this.state;
    this.setState({ circleMenu: !circleMenu })
  }

  handleToggleMembership(circleId, connectionId, isMember){
    return e => {
      e.stopPropagation();
      if (isMember){
        const circleConnection = Object.values(this.props.circleConnections)
          .find(conn => conn.circleId === circleId &&
            conn.connectionId === connectionId)
        this.setState({ contactAnchorEl: null },
        () => this.props.removeMember(circleConnection.id));
      } else {
        this.props.addMember(circleId, connectionId)
      }
    }
  }

  openCircle(circleId){
    return e => {
      e.stopPropagation();
      this.props.openCircle(circleId);
      this.setState({ contactAnchorEl: null });
      // this.props.history.push(`/mynetwork/circles/${circleId}`);
    }
  }

  openCreateModal(e){
    e.stopPropagation();
    this.props.openCreateCircle();
    this.setState({ contactAnchorEl: null });
  }

  transformCircleConnections(){
    const { circleConnections } = this.props;
    let transformedCircleConnections = Object.values(circleConnections)
      .reduce((acc, circleConnection) => {
        if(!acc[circleConnection.circleId]){
          acc[circleConnection.circleId] = new Set()
        }
        acc[circleConnection.circleId].add(circleConnection.connectionId)
        return acc
      }, {})
    // debugger
    return transformedCircleConnections
  }

  getSecondaryAction(){
    const { classes, contact, currentUser,
      search, connections, circles  } = this.props;
    const { contactAnchorEl, inviteAnchorEl,
      circleMenu } = this.state;
    const transformedCircleConnections = this.transformCircleConnections();

    if(search){
      let connected = Object.values(connections).filter(x =>(
          (x.userId === currentUser.id && x.friendId === contact) ||
          (x.friendId === currentUser.id && x.userId === contact)
        ))

      if(connected.length > 0 && connected[0].status === 'Accepted'){
        return (
          <div>
            <Typography align='left' color='textPrimary'
              style={{ fontSize: 13, fontWeight: 600, marginRight: 20}}
              className={classes.desktopOptions}>
              {`My Contact`}
            </Typography>
            <CheckIcon className={classes.mobileOptions}
              style={{ marginRight: 13}}/>
          </div>
        )
      } else if(connected.length > 0 && connected[0].status === 'Pending'){
        return (
          <div>
            <Typography align='left' color='textPrimary'
              style={{ fontSize: 13, fontWeight: 600, marginRight: 20}}
              className={classes.desktopOptions}>
              {`Pending Invite`}
            </Typography>
            <LoopIcon className={classes.mobileOptions}
              style={{ marginRight: 13}}/>
          </div>
        )
      } else {
        return (
          <div>
            <Button variant='contained' color='primary'
              onClick={this.openInvite}
              style={{ textTransform: 'capitalize'}}
              className={classes.desktopOptions}>
              {`Add Contact`}
            </Button>
            <IconButton
              onClick={this.openInvite}
              className={classes.mobileOptions}>
              <AddCircleIcon />
            </IconButton>
          </div>
        )
      }
    } else {
      switch (contact.status) {
        // <Button variant='contained' color='primary'
        //   onClick={this.removeConnection}
        //   className={classes.desktopOptions}
        //   style={{ textTransform: 'capitalize'}}>
        //   {`Remove User`}
        // </Button>
        // <DeleteIcon
        //   style={{ marginRight: 3 }}/>
        case 'Accepted':
        return (
          <div>
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
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              getContentAnchorEl={null}
              >
              { !circleMenu ? (
                <div>
                  {/*List all Circles this user is a part of */}
                  {/*Object.values(circles).filter(x => (
                    transformedCircleConnections[x.id] &&
                    transformedCircleConnections[x.id].has(contact.id)
                  )).map(circle => (
                    <MenuItem onClick={this.openCircle(circle.id)}>
                      {`${this.capitalize(circle.title)}`}
                    </MenuItem>
                  )) */}
                  <MenuItem onClick={this.handleToggleCircleMenu}
                    className={classes.borderBelow}>
                    {`Add to Network Circle`}
                  </MenuItem>
                  <MenuItem onClick={this.removeConnection}>
                    {`Remove User`}
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={this.handleToggleCircleMenu}
                    className={classes.borderBelow}>
                    {`Go Back`}
                  </MenuItem>
                  {/*List all Circles you have */}
                  {Object.values(circles).map(circle => {
                    let user = this.getUser();
                    let isMember = transformedCircleConnections[circle.id] ?
                      transformedCircleConnections[circle.id].has(contact.id) :
                      false
                    return <MenuItem onClick={this.handleToggleMembership(circle.id, contact.id, isMember)}>
                      {isMember ?
                        <CheckIcon
                          style={{ marginRight: 4 }}/> :
                        <div style={{ width: 29 }}/>
                      }
                      {`${this.capitalize(circle.title)}`}
                    </MenuItem>
                  })}
                  <MenuItem onClick={this.openCreateModal}>
                    <AddIcon
                      style={{ marginRight: 4 }}/>
                    {`Add circle...`}
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        )
        case 'Pending':
        if(currentUser.id === contact.friendId){
          return (
            <div>
              {/*<Grid container justify='flex-end'
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
              </Grid>*/}

              <Grid container justify='flex-end'>
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
            </div>
          )
        } else {
          return (
            <div>
              <Button variant='contained'
                onClick={this.removeConnection}
                className={classes.desktopOptions}>
                Revoke
              </Button>

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
                  <MenuItem onClick={this.removeConnection}>
                    {`Revoke`}
                  </MenuItem>
                </Menu>
              </Grid>
            </div>
          )
        };
        default:
        return <div></div>
      }
    }
  }

  getUser(){
    const { search, users, contact, currentUser } = this.props;

    if(search){
      return users[contact]
    } else {
      let friend = (currentUser.id !== contact.userId) ?
      contact.userId : contact.friendId
      return users[friend];
    }
  }

  render(){
    const { classes, users, currentUser,
      contact, search } = this.props;
    const { inviteModalOpen } = this.state;
    let user = this.getUser();

    if(user){
      return (
        <Grid container className={classes.userCard}
          justify="center" alignItems="center"
          onClick={this.handleProfilePage}>
          <Grid item xs={9} sm={7} container justify='space-between' alignItems='center'>
            <Grid item xs={3}>
              <Avatar>
                {user.profilePicUrl ? (
                  <VisibilitySensor>
                    <Img src={user.profilePicUrl}
                      className={classes.profilePic}
                      />
                  </VisibilitySensor>
                ):<PersonIcon />}
              </Avatar>
            </Grid>
            <Grid item xs={9} container direction='column'>
              <Typography variant="body1" align='left' color="textPrimary"
                noWrap
                style={{ fontSize: 13, fontWeight: 600, width:'100%', textTransform: 'capitalize'}}>
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

          {/*<ListItemText
            classes={{
            primary: classes.listItemText,
            secondary: classes.listItemText}}
            primary={`${this.capitalize(user.fname)} ${this.capitalize(user.lname)}`}
            secondary={(user.title && `${user.title} @ `) + (user.company && `${user.company}`)}
            />*/}

            <Grid item xs={3} sm={5} container justify='flex-end'>
              {currentUser.id !== user.id && this.getSecondaryAction()}
            </Grid>

          </Grid>
        )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(ContactCard)));
