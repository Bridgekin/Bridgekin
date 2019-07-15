import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Loading from '../loading';
import PersonIcon from '@material-ui/icons/PersonSharp';

import Img from 'react-image'
import TwitterLogo from '../../static/twitter-logo.svg'
import LinkedInLogo from '../../static/linkedin-sign.svg'
import { fetchSalesIntro } from '../../actions/sales_intro_actions';
import { openLogin, openRespondToRequest } from '../../actions/modal_actions';
import { respondToRequest } from '../../actions/sales_intro_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  introId: parseInt(ownProps.match.params.introId),
  salesIntros: state.entities.sales.salesIntros,
  salesContacts: state.entities.sales.salesContacts
});

const mapDispatchToProps = dispatch => ({
  fetchSalesIntro: introId => dispatch(fetchSalesIntro(introId)),
  openLogin: payload => dispatch(openLogin(payload)),
  openRespondToRequest: response => dispatch(openRespondToRequest(response)),
  respondToRequest: payload => dispatch(respondToRequest(payload)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
  actionButton:{
    padding: "5px 15px"
  },
  defaultProfilePic: {
    height: 'auto',
    width: '70%',
    color: 'white'
  },
  profileContainer:{
    width: 155,
    height: 155,
    borderRadius: '50%',
    backgroundColor: `grey`,
    margin: "20px 0px 30px"
  },
  socialIcon: {
    height: "25px !important",
    width: "25px !important",
    margin: "0px 5px",
    cursor: 'pointer'
  },
  avatar:{
    width:'100%',
    height: 'auto',
    maxWidth: 200
  },
  profileLetter: {
    width: 150,
    height: 150,
    borderRadius: "50%"
  },
})

const COLORS = ["#FF8833", "#D92121", "#3AA655", "#0095B7"]
const colorChoice = COLORS[Math.floor(Math.random() * COLORS.length)]

class RespondToIntro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.loadIntro = this.loadIntro.bind(this);
  }

  componentDidMount(){
    const { introId, currentUser } = this.props;
    this.loadIntro();
    if (!currentUser) {
      this.props.openLogin({
        page: 'login',
        message: `**You must login to view this introduction request**`,
        redirectFailure: '/sales'
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.currentUser && nextProps.currentUser !== this.props.currentUser){
      this.loadIntro()
    }
    return true
  }

  async loadIntro(){
    const { introId } = this.props;
    if(this.props.currentUser){
      this.props.fetchSalesIntro(introId)
      .then(() => {
        const { salesIntros, currentUser } = this.props;
        let intro = salesIntros[introId];
        if(intro.recipientId === currentUser.id){
          this.setState({ loaded: true })
        } else {
          this.props.history.push('/sales/stats')
        }
      })
    };
  }

  respondToRequest(decision){
    return e => {
      const { introId } = this.props;
      let response = { decision, introId };
      if (decision === "don't know"){
        this.props.respondToRequest(response)
        .then(() => {
          this.props.openRespondToRequest(response)
        })
      } else {
        this.props.openRespondToRequest(response)
      }
    }
  }

  redirectSocial(url) {
    return e => {
      window.location.replace(url)
    }
  }

  render() {
    const { classes, currentUser, 
      dimensions, salesIntros, salesContacts,
      introId } = this.props
    const { loaded } = this.state;

    if (currentUser && loaded){
      let intro = salesIntros[introId];
      let contact = salesContacts[intro.contactId];

      let contactComp = <Grid container justify='center'>
        <Grid item xs={10} sm={8}
        style={{ marginTop: 30}}>
          <Typography align='center' gutterBottom
          style={{ fontSize: 24, fontWeight: 600}}>
            {`Make warm introductions and help you and your company grow`}
          </Typography>

          {intro.explaination && <Grid container direction='column' alignItems='center'>
            <Typography align='center'
              style={{ fontSize: 16, fontWeight: 600 }}>
              {`Why would this be a good fit?`}
            </Typography>
            <Typography align='center' gutterBottom
            style={{ fontSize: 16 }}>
              {`${intro.explaination}`}
            </Typography>
          </Grid>}

          {intro.referralBonus && 
            <Typography align='center'
              style={{ fontSize: 16 }}>
            {`Referral Amount:`}<b>{` ${intro.referralUnit}${intro.referralBonus}`}</b>
            </Typography>}

          <Grid container justify='center'
          style={{ margin: "20px 0px"}}>
            <Grid item xs={8} sm={6} 
            container alignItems='center'
            direction='column'
            style={{ padding: "15px 0px "}}>
              {contact.avatarUrl ? 
                <Avatar alt="profile-pic"
                  src={contact.avatarUrl}
                  className={classes.avatar}/>
                : <Grid container justify='center'
                  alignItems='center'
                  className={classes.profileLetter}
                  style={{ backgroundColor: colorChoice, margin: "20px 0px"}}>
                  <Typography
                    style={{ fontSize: 60, fontWeight: 600, color: "white" }}>
                    {`${contact.fname.charAt(0)}`}
                  </Typography>
                </Grid>
              }
              <Typography align='center' 
              gutterBottom 
              style={{ fontSize: 18}}>
                {`${contact.fname} ${contact.lname}`}
              </Typography>
              <Typography align='center' 
              color='textSecondary'
                style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {`${contact.position}`}
              </Typography>
              <Typography align='center' 
                color='textSecondary'
                style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {`${contact.company || "Unknown Company"}`}
              </Typography>

              <div style={{width:'65%', borderTop:`1px solid grey`, margin: "15px 0px" }}/>

              <Typography align='center' 
                color='textPrimary'
                style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {`Location: ${contact.location || "N/A"}`}
              </Typography>

              <Grid container justify='center' style={{ marginTop: 5}}>
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
            <Grid></Grid>
          </Grid>

          <Grid container justify='center'>
            <Grid item xs={8} container justify='center'>
              <Button color='primary' variant='contained'
                onClick={this.respondToRequest("intro")}
                className={classes.actionButton}
                style={{ marginRight: 20}}>
                {`Intro`}
              </Button>
              <Button color='primary' variant='contained'
                onClick={this.respondToRequest("don't know")}
                className={classes.actionButton}
                style={{ marginRight: 20 }}>
                {`Don't know`}
              </Button>
              <Button color='primary' variant='contained'
                onClick={this.respondToRequest("prefer not")}
                className={classes.actionButton}>
                {`I'd prefer not to reach out`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      let messageComp = <Grid container justify='center'>
        <div></div>
      </Grid>

      return <div style={{minHeight: dimensions.height}}>
        <Grid container className={classes.grid}>
          {contactComp}
          {messageComp}
        </Grid>
      </div>
    } else {
      return (
        <Grid container justify='center' alignItems='center'
        style={{ minHeight: dimensions.height}}>
          <Loading />
        </Grid>
      )
    }
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RespondToIntro));
