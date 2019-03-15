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
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Img from 'react-image'
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

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  circles: state.entities.circles,
  circleMembers: state.entities.circleMembers
});

const mapDispatchToProps = dispatch => ({
  // openInvite: userId => dispatch(openInvite(userId)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class CircleCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render(){
    const { classes, circle,
      circleMembers} = this.props
    const { anchorEl } = this.state;
    // let circle = circles[circleId]

    if(circle) {
      return (
        <Grid container className={classes.userCard}
          justify="center" alignItems="center"
          onClick={this.handleProfilePage}>
          <Grid item xs={9} sm={7} container justify='space-between' alignItems='center'>
            <Grid item xs={3}>
              <Avatar>
                {`${this.capitalize(circle.title[0])}`}
              </Avatar>
            </Grid>
            <Grid item xs={9} container direction='column'>
              <Typography variant="body1" align='left' color="textPrimary"
                noWrap
                style={{ fontSize: 15, fontWeight: 600, width:'100%', textTransform: 'capitalize'}}>
                {`${circle.title}`}
              </Typography>
              <Typography variant="body1" align='left' color="textPrimary"
                noWrap
                style={{ fontSize: 12, fontWeight: 400, width:'100%', textTransform: 'capitalize'}}>
                {`${circleMembers[circle.id]} Members`}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={3} sm={5} container justify='flex-end'>
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
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              getContentAnchorEl={null}
              >
              <MenuItem onClick={this.handleToggleCircleMenu}
                className={classes.borderBelow}>
                {`Go Back`}
              </MenuItem>
            </Menu>
          </Grid>

          </Grid>
        )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(CircleCard)));
