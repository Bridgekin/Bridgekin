import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Img from 'react-image'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/PersonSharp';
import IconButton from '@material-ui/core/IconButton';

// import { SocialIcon } from 'react-social-icons';
import TwitterLogo from '../../static/twitter-logo.svg'
import LinkedInLogo from '../../static/linkedin-sign.svg'
import { openRequestIntro } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networkMembers: {},
  friendMap: state.entities.sales.friendMap,
  // currentSalesNetworkId: state.entities.sales.currentSalesNetwork,
  salesUserPermissions: state.entities.sales.salesUserPermissions,
  currentDashboardTarget: state.entities.sales.currentDashboardTarget,
});

const mapDispatchToProps = dispatch => ({
  openRequestIntro: payload => dispatch(openRequestIntro(payload))
});

const COLORS = ["#FF8833", "#D92121", "#3AA655","#0095B7"]

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  connectedMember:{
    borderRadius: '50%',
    height: 31, width: 31
  }, 
  pictureCover: {
    height: 140,
    width: '100%',
    objectFit: 'cover',
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`
  },
  socialIcon:{
    height: "25px !important", 
    width: "25px !important",
    margin: "0px 5px",
    cursor: 'pointer'
  },
  socialIconButton:{
    '&:hover': {
      backgroundColor: 'none'
    },
    padding:0
  },
  defaultProfilePic: {
    height: 'auto',
    width: '100%',
    color: theme.palette.text.secondary
  },
  card:{
    // border: `1px solid ${theme.palette.border.secondary}`,
    margin: "10px 0px",
    // padding: 10
  },
  cardDivider: { borderTop: `1px solid ${theme.palette.border.secondary}`},
  actionSection:{
    padding: "10px 0px"
  },
  nameDivider:{
    borderBottom: `1px solid grey`, 
    margin: "10px 0px"
  },
  profileLetter: {
    width: '100%',
    height: 'auto',
    borderRadius: "50%"
  },
  avatar:{
    width:'100%',
    height: 'auto'
  }
})

class ResultCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.requestIntro = this.requestIntro.bind(this);
  }

  requestIntro(){
    const { contact } = this.props;
    this.props.openRequestIntro({ 
      page: 'request',
      contact
    })
  }

  redirectSocial(url){
    return e => {
      // window.location.replace(url)
      var win = window.open(url, 'bridgekin - social redirect');
      win.focus();
    }
  }

  render(){
    const { classes, contact, networkMembers,
      friendMap, idx,
      salesUserPermissions, currentDashboardTarget } = this.props;
    
    if (Object.keys(friendMap).length > 0){
      let otherFriendsCount = friendMap[contact.id].length || 0

      // let user_permission = Object.values(salesUserPermissions).find(perm => perm.permissableId === currentDashboardTarget.permissableId && perm.permissableType === "Network")

      let { relationship }= currentDashboardTarget

      return <Grid item xs={12} sm={6}>
        <Paper>
          <Grid container 
            justify='center'
            className={classes.card}>
            <Grid container item xs={11}>
              <Grid item xs={3} container alignItems='center'>
                {contact.avatarUrl ? 
                <Avatar alt="profile-pic"
                  src={contact.avatarUrl}
                  className={classes.avatar}/> :
                <Grid container justify='center' 
                alignItems='center'
                className={classes.profileLetter}
                  style={{ backgroundColor: COLORS[Math.floor(idx % COLORS.length)],}}>
                  <Typography 
                  style={{ fontSize: 50, fontWeight: 600, color:"white"}}>
                    {`${contact.fname.charAt(0)}`}
                  </Typography>
                </Grid>}
              </Grid>

              <Grid item xs={9}
              style={{ padding: 16}}>
                <div style={{ height: 64 }}>
                  <Typography color='textPrimary' noWrap
                  style={{ fontSize: 18, textTransform: 'capitalize'}}>
                    {`${contact.fname} ${contact.lname}`}
                  </Typography>
                  <Typography color={contact.position ? 'textPrimary':'textSecondary'} noWrap
                    style={{ fontSize: 13, textTransform: 'capitalize' }}>
                    {`${contact.position || "Position: N/A"}`}
                  </Typography>
                  <Typography color={contact.company ? 'textPrimary':'textSecondary'} noWrap
                    style={{ fontSize: 13, textTransform: 'capitalize' }}>
                    {`${contact.company || "Company: N/A"}`}
                  </Typography>
                </div>
                
                <div className={classes.nameDivider}/>

                <Typography color={contact.location ? 'textPrimary':'textSecondary'} noWrap
                  style={{ fontSize: 13, textTransform: 'capitalize' }}>
                  {`${contact.location || "Location: N/A"}`}
                </Typography>

                <Grid container style={{ marginTop: 5}}>
                  {/*{contact.linkedinUrl && <SocialIcon 
                    url={contact.linkedinUrl}
                    network="linkedin" 
                    className={classes.socialIcon}/>}
                  {contact.twitterHandle && <SocialIcon  
                    url={contact.twitterHandle}
                    network="twitter"
                  className={classes.socialIcon} />}*/}
                  {contact.linkedinUrl && <Img src={LinkedInLogo}
                    onClick={this.redirectSocial(contact.linkedinUrl)}
                  className={classes.socialIcon} />}
                  {contact.twitterHandle && <Img src={TwitterLogo}
                    onClick={this.redirectSocial(contact.twitterHandle)}
                    className={classes.socialIcon} />}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={11} className={classes.cardDivider}/>

            <Grid container justify='flex-end' alignItems='center' item xs={11}
            className={classes.actionSection}>
              {/*contact.connectedMembers.map(id => {
                let member = networkMembers[id];
                return <div 
                className={classes.connectedMember}>
                  <Img src={member.profilePicUrl}
                    className={classes.pictureCover}/>
                </div>
              }) */}
              <Typography color='textPrimary'
              style={{ fontSize: 12, marginRight: 10}}>
                {`Known Teammates: ${otherFriendsCount || "N/A"}`}
              </Typography>
              <Button color='primary' variant='contained'
                onClick={this.requestIntro}
                data-cy='request-intro-button'
                disabled={otherFriendsCount === 0}
                style={{ textTransform: 'capitalize'}}>
                {`Request a warm intro`}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultCard));
