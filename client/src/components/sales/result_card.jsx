import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Img from 'react-image'

import PersonIcon from '@material-ui/icons/PersonSharp';

import { SocialIcon } from 'react-social-icons';
import { openRequestIntro } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networkMembers: {}
});

const mapDispatchToProps = dispatch => ({
  openRequestIntro: payload => dispatch(openRequestIntro(payload))
});

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
    height: 25, width: 25
  },
  defaultProfilePic: {
    height: 'auto',
    width: '100%',
    color: theme.palette.text.secondary
  },
  card:{
    border: `1px solid ${theme.palette.border.secondary}`,
  },
  cardDivider: { borderTop: `1px solid ${theme.palette.border.secondary}`},
  actionSection:{
    padding: 10
  },
  nameDivider:{
    borderBottom: `1px solid grey`, 
    margin: "10px 0px"
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

  render(){
    const { classes, contact, networkMembers } = this.props;
    return <Grid item xs={12} sm={6} container 
    justify='center'
      className={classes.card}>
      <Grid container>
        <Grid item xs={3} container alignItems='center'> 
          <PersonIcon
            className={classes.defaultProfilePic}
            onClick={this.sendToAccountSettings} />
        </Grid>
        <Grid item xs={9}
        style={{ padding: 16}}>
          <Typography color='textPrimary'
          style={{ fontSize: 18, textTransform: 'capitalize'}}>
            {`${contact.fname} ${contact.lname}`}
          </Typography>
          <Typography color='textPrimary'
            style={{ fontSize: 13, textTransform: 'capitalize' }}>
            {`${contact.position}`}
          </Typography>
          <Typography color='textPrimary'
            style={{ fontSize: 13, textTransform: 'capitalize' }}>
            {`${contact.company}`}
          </Typography>
          
          <div className={classes.nameDivider}/>

          <Typography color='textPrimary'
            style={{ fontSize: 13, textTransform: 'capitalize' }}>
            {`${contact.location || "Location: Unknown"}`}
          </Typography>

          {false && <Grid container>
            <SocialIcon url="http://linkedin.com/"
              network="linkedin" 
              className={classes.socialIcon}/>
            <SocialIcon network="email"
              url="mailto:mail@example.org" 
              className={classes.socialIcon}/>
          </Grid>}
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.cardDivider}/>
      <Grid container justify='flex-end'
      className={classes.actionSection}>
        {/*contact.connectedMembers.map(id => {
          let member = networkMembers[id];
          return <div 
          className={classes.connectedMember}>
            <Img src={member.profilePicUrl}
              className={classes.pictureCover}/>
          </div>
        }) */}
        <Button color='primary' variant='contained'
        onClick={this.requestIntro}
        style={{ textTransform: 'capitalize'}}>
          {`Request a warm intro`}
        </Button>
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultCard));
