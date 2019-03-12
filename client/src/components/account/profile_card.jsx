import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import blankProfilePic from '../../static/blank_profile_pic.png';
import EditIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddSharp';
import PersonIcon from '@material-ui/icons/PersonSharp';
import Avatar from '@material-ui/core/Avatar';

import FeedCard from '../feed_card';
import InviteModal from '../connections/invite_modal';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  cover: {
    width: '100%',
    height: 217
  },
  addProfilePicIcon:{
    width: '100%',
    height: 217,
    // backgroundColor: theme.palette.base3,
    color: theme.palette.text.secondary
  },
  // card:{
  //   // height: 118,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   // padding: 30,
  //   backgroundColor: theme.palette.base3,
  //   // marginTop: 18,
  //   // width: '100%',
  //   borderRadius: 5,
  //   border: `1px solid ${theme.palette.border.primary}`
  // },
  cardSection:{
    marginTop: 10
  },
  content:{padding: "0px 10px"},
  wrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  cardEditIcon:{
    color: "#d3d3d3",
    fontSize: 20
  },
  pic:{
    height: 'auto',
    width: '100%',
    // borderRadius: 0
  },
  // accountHomeContainer:{
  //   overflow: 'scroll',
  //   [theme.breakpoints.up('sm')]: {
  //     // paddingTop: 18
  //   },
  // },
  moreIcon: { color:theme.palette.text.secondary}
});


class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inviteModalOpen: false
    }

    this.openInvite = this.openInvite.bind(this);
    this.closeInvite = this.closeInvite.bind(this);
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  openInvite(e){
    this.setState({ inviteModalOpen: true })
  }

  closeInvite(){
    this.setState({ inviteModalOpen: false })
  }

  render(){
    const { classes, user, currentUser }= this.props;
    const { inviteModalOpen } = this.state;

    let profilePic = user.profilePicUrl ? (
      <Avatar
        className={classes.pic}
        src={user.profilePicUrl}
        alt="Account Profile Picture"
        onClick={()=> this.props.history.push('/account/settings/general')}
      />
    ) : (
      <PersonIcon
        className={classes.addProfilePicIcon}
        onClick={()=> this.props.history.push('/account/settings/general')}/>
    )

    let profile = (
      <Grid container justify="center" alignItems="flex-start"
        style={{ padding: '25px 15px' }}>

        <Grid item xs={8} sm={6} md={4} container justify='center'
          style={{ padding: 5}}>
          {profilePic}

          {currentUser.id !== user.id &&
            <Button variant='contained' color='primary'
              onClick={this.openInvite}
              style={{ marginTop: 20}}>
              {`Invite`}
            </Button>
          }
        </Grid>

        <Grid item xs={10} md={8} className={classes.content}>
          <div className={classes.wrapper}>
            <Typography variant="h3" gutterBottom
              color="textSecondary" align='left'>
              {`${user.fname} ${user.lname}`.toUpperCase()}
            </Typography>
            {currentUser.id === user.id && <IconButton className={classes.button}
              onClick={() => this.props.history.push('/account/settings/general')}
              style={{ marginLeft: 10 }}>
              <EditIcon className={classes.moreIcon}/>
            </IconButton>}
          </div>

          <Typography variant="h6" gutterBottom align='left'
            color="textSecondary" className={classes.cardSection}>
            Title
          </Typography>
          <Typography variant="body2" gutterBottom align='left'
            color="textPrimary">
            {user.title ? this.capitalize(user.title) : 'Unknown'}
          </Typography>

          <Typography variant="h6" gutterBottom align='left'
            color="textSecondary" className={classes.cardSection}>
            Company
          </Typography>
          <Typography variant="body2" gutterBottom align='left'
            color="textPrimary">
            {user.company ? this.capitalize(user.company) : 'Unknown'}
          </Typography>

          <Typography variant="h6" gutterBottom align='left'
            color="textSecondary" className={classes.cardSection}>
            Location
          </Typography>
          <Typography variant="body2" gutterBottom align='left'
            color="textPrimary">
            {user.city ?
              `${user.city}, ${user.country}` :
              "Unknown"
            }
          </Typography>
        </Grid>

        <InviteModal
          open={inviteModalOpen}
          userId={user.id}
          handleClose={this.closeInvite}
          />
      </Grid>
    )

    return <FeedCard contents={profile} />
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(withRouter(Profile)));

// <div className={classes.accountHomeContainer}>
//   <Card className={classes.card}>
//
//
//   </Card>
// </div>
//
