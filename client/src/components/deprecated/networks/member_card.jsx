import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import VisibilitySensor from 'react-visibility-sensor';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Img from 'react-image'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { removeMemberUser } from '../../actions/member_users_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  removeMemberUser: (networkId, userId) => dispatch(removeMemberUser(networkId, userId))
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
  listItemPrimary: {
    color: theme.palette.text.primary,
    fontSize: 13
  },
  listItemSecondary: {
    color: theme.palette.text.primary,
    fontSize: 12
  },
  horizIcon: { color: theme.palette.text.primary}
});

class MemberCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }

  handleRemoveUser(){
    const{ networkId, user } = this.props;
    this.props.removeMemberUser(networkId, user.id)
    .then(() => this.setState({ anchorEl: null }))
  }

  handleMenuClick(e){
    const { anchorEl } = this.state;
    this.setState({ anchorEl: anchorEl ? null : e.currentTarget})
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render(){
    const { classes, user } = this.props;
    const { anchorEl } = this.state;

    return(
      <Grid container className={classes.userCard}
        justify="flex-start" alignItems="center">
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
              primary: classes.listItemPrimary,
              secondary: classes.listItemSecondary}}
            primary={`${this.capitalize(user.fname)} ${this.capitalize(user.lname)}`}
            secondary={`${user.email}`}
          />

          <ListItemSecondaryAction>
            <IconButton aria-label="More"
              onClick={this.handleMenuClick}>
              <MoreHorizIcon className={classes.horizIcon}/>
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClick}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={this.handleRemoveUser}>
                <DeleteIcon
                  style={{ marginRight: 3 }}/>
                {`Remove User`}
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
      </Grid>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MemberCard));
