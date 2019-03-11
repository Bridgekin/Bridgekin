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

import PersonIcon from '@material-ui/icons/Person';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import InviteModal from '../connections/invite_modal';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class SearchTemplate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inviteModalOpen: false
    }

    this.handleProfilePage = this.handleProfilePage.bind(this);
    this.openInvite = this.openInvite.bind(this);
    this.closeInvite = this.closeInvite.bind(this);
  }

  handleProfilePage(userId){
    return e => {
      this.props.history.push(`/mynetwork/profile/${userId}`)
    }
  }

  openInvite(e){
    e.stopPropagation();
    this.setState({ inviteModalOpen: true })
  }

  closeInvite(){
    this.setState({ inviteModalOpen: false })
  }

  render(){
    const { user } = this.props;
    const { inviteModalOpen } = this.state;

    return (
      <MenuItem onClick={this.handleProfilePage(user.id)}
        style={{ height: 30 }}>
        <Grid container>
          <Grid item sm={10} container justify='space-between' alignItems='center'>
            <Avatar
              style={{ height: 25, width: 25 }}>
              <PersonIcon />
            </Avatar>
            <Grid item sm={10} container direction='column'>
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
          <Grid item sm={2}>
            <IconButton onClick={this.openInvite}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>

        <InviteModal
          open={inviteModalOpen}
          userId={user.id}
          handleClose={this.closeInvite}
          />
      </MenuItem>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SearchTemplate)));
