import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';

import FeedCard from '../feed_card';
import { openInvite, openUpdateUser }
  from '../../actions/modal_actions';
import { updateUser } from '../../actions/user_actions';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  workspaces: state.workspaces,
  connections: state.entities.connections
});

const mapDispatchToProps = dispatch => ({
  openUpdateUser: (settingsType) => dispatch(openUpdateUser(settingsType)),
  openInvite: userId => dispatch(openInvite(userId)),
  updateUser: user => dispatch(updateUser(user))
})

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
  // addProfilePicIcon:{
  //   width: '100%',
  //   height: 217,
  //   // backgroundColor: theme.palette.base3,
  //   color: theme.palette.text.secondary
  // },
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
    maxWidth: 178,
    color: theme.palette.text.secondary
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
    this.state = {}

    this.openInvite = this.openInvite.bind(this);
    this.sendToAccountSettings = this.sendToAccountSettings.bind(this);
    this.getInviteText = this.getInviteText.bind(this);
    this.handleUpdateUserChange = this.handleUpdateUserChange.bind(this);
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  openInvite(e){
    this.props.openInvite(this.props.user.id)
  }

  sendToAccountSettings(){
    const { user, currentUser }= this.props;
    if(currentUser.id === user.id){
      this.props.history.push('/account/settings/general')
    }
  }

  handleUpdateUserChange(field){
    return e => {
      const formData = new FormData();
      if (field === 'searchable'){
        let option = e.target.checked;
        formData.append(`user[${field}]`, option)
        formData.append('user[id]', this.props.currentUser.id)
      } else {
        let option = e.target.value;
        formData.append(`user[${field}]`,option)
        formData.append('user[id]', this.props.currentUser.id)
      }

      this.props.updateUser(formData)
      .then(() => {
        this.props.openUpdateUser('general');
      })
    }
  }

  getInviteText(){
    const { user, currentUser, connections } = this.props;
    let connection = Object.values(connections).filter( x => (
      (x.userId === user.id && x.friendId === currentUser.id) ||
      (x.userId === currentUser.id && x.friendId === user.id)
    ))

    if (connection.length > 0){
      switch(connection[0].status){
        case "Accepted":
        return "Connected";
        case "Pending":
        return "Pending";
        default:
        return "Unknown";
      }
    } else {
      return 'Add Contact';
    }
  }

  render(){
    const { classes, user, currentUser, workspaces }= this.props;

    let profilePic = user.profilePicUrl ? (
      <Avatar
        className={classes.pic}
        src={user.profilePicUrl}
        alt="Account Profile Picture"
        onClick={this.sendToAccountSettings}
      />
    ) : (
      <PersonIcon
        className={classes.pic}
        onClick={this.sendToAccountSettings}/>
    )

    let inviteUserText = this.getInviteText();

    let profile = (
      <Grid container justify="center" alignItems="flex-start"
        style={{ padding: '25px 15px', position: 'relative' }}>

        {/*<div style={{ position: 'absolute', top: 0, right: 0}}>
          {currentUser.id !== user.id &&
            <IconButton onClick={this.openInvite}>
              <AddCircleIcon style={{ color: 'black', width: 40, height: 40}}/>
            </IconButton>
          }
        </div>*/}

        <Grid item xs={12} sm={6} md={4} container justify='center'
          style={{ padding: 5}}>
          {profilePic}
        </Grid>

        <Grid item xs={12} md={8} className={classes.content}>
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
          {currentUser.id !== user.id &&
            <Button variant='contained' color='primary'
              onClick={this.openInvite}
              disabled={inviteUserText !== "Add Contact"}
              style={{ margin: "10px 0px"}}>
              {inviteUserText}
            </Button>
          }

          {currentUser.id === user.id && <Grid container>
            <Grid container>
              <Typography variant="h6" align='left'
                color='textSecondary'>
                Email Address
              </Typography>
              <Link to='/account/settings/email'
                style={{ marginLeft: 15}}>
                <Typography variant="h6" align='left'
                  color='textSecondary'
                  style={{fontWeight: 300}}>
                  Change
                </Typography>
              </Link>
            </Grid>
            <Typography variant="body1" gutterBottom align='left'
              color="textPrimary" style={{ marginBottom: 15}}>
              {currentUser.email}
            </Typography>

            <Grid container>
              <Typography variant="h6" align='left'
                color='textSecondary'>
                Current Password
              </Typography>
              <Link to='/account/settings/password'
                style={{ marginLeft: 15}}>
                <Typography variant="h6" align='left'
                  color='textSecondary' style={{ fontWeight: 300 }}>
                  Change
                </Typography>
              </Link>
            </Grid>

            <Typography variant="body1" gutterBottom align='left'
              color="textPrimary" style={{ marginBottom: 15}}>
              {"********"}
            </Typography>

            <Grid container>
              <Typography variant="h6" align='left'
                color='textSecondary'>
                Default Network
              </Typography>
            </Grid>
            <Grid container alignItems="center"
              style={{ marginBottom: 15}}>
              <Grid item xs={8}>
                <Select
                  fullWidth
                  value={currentUser.defaultNetworkId}
                  onChange={this.handleUpdateUserChange('defaultNetworkId')}
                  inputProps={{
                    name: 'defaultNetworkId',
                    id: 'defaultNetworkId-simple',
                  }}
                  renderValue={selected => workspaces[selected].title}
                  >
                  {Object.values(workspaces).map(workspace => (
                    <MenuItem value={workspace.id}>
                      {workspace.title}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>

            {currentUser.isAdmin && <Grid container>
              <Grid item xs={8}>
                <Typography variant="h6" align='left'
                  color='textSecondary'
                  style={{ fontSize: 16}}>
                  {`Searchable:`}
                </Typography>
                <Typography variant="body1" align='left'
                  color='textSecondary'
                  style={{ fontSize: 14 }}>
                  {`Can other users search for you on Bridgekin?`}
                </Typography>
                {/*`Setting this to false will remove users ability to search
                  for you within Bridgekin. No one will be able to connect
                  with you unless they are a personal contact (know your email).`*/}
              </Grid>

              <Grid item xs={4}>
                <Switch
                  checked={user.searchable}
                  onChange={this.handleUpdateUserChange('searchable')}
                />
              </Grid>
            </Grid>}

            {false && <Typography variant="subtitle1" align='left'
              color="textPrimary" style={{ marginTop: 15}}>
              {`How often would you like to be notified about
                opportunities by email?`}
              </Typography>}

              {false && <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Notifications"
                name="notifications"
                className={classes.group}
                value={this.state.notificationSetting}
                onChange={this.handleNotificationChange}
                >
                <FormControlLabel value="Weekly" control={<Radio />} label="Weekly email recap" />
                <FormControlLabel value="Never" control={<Radio />} label="Never, I am immune to FOMO" />
              </RadioGroup>
            </FormControl>}
          </Grid>}
        </Grid>
      </Grid>
    )

    return <FeedCard contents={profile} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Profile)));

// <div className={classes.accountHomeContainer}>
//   <Card className={classes.card}>
//
//
//   </Card>
// </div>
//
