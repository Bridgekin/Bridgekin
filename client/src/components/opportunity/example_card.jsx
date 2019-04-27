import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CloseIcon from '@material-ui/icons/Close';
import LinesEllipsis from 'react-lines-ellipsis';

import CircularProgress from '@material-ui/core/CircularProgress';

// import CardModal from './card_modal';

import ConnectIcon from '../../static/opp_feed_icons/share-link.svg'
import ReferIcon from '../../static/opp_feed_icons/refer.png'
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/EditSharp';
import { openOppCard } from '../../actions/modal_actions';

import Img from 'react-image';
import ExamplePicture from '../../static/opportunity_images/Professional_business_services.jpg';
import ExampleProfile from '../../static/my_trusted_network_images/Joe_Lopardo.png';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  openOppCard: (payload) => dispatch(openOppCard(payload)),
});

const styles = theme => ({
  feedCardActionContainer:{
    // marginTop: 10,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    padding: 0
  },
  statusIndicator:{
    width: 8, height: 8,
    borderRadius: '50%',
    marginRight: 6
  },
  opportunityCard:{
    backgroundColor: `${theme.palette.base3}`,
    marginBottom: 9,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
    }
  },
  oppCardGrid:{
    padding: "0px 8px",
    [theme.breakpoints.up('sm')]: {
      padding: "0px 17px"
    },
    // marginBottom: 10
  },
  oppStatus:{
    // height: 40,
    minWidth: 89,
    textTransform: 'uppercase',
    backgroundColor: theme.palette.base4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  pictureCover:{
    height: 140,
    width: '100%',
    objectFit: 'cover',
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`
  },
  avatar:{
    width: 40,
    height: 40,
    margin: '12px 12px 12px 5px',
    color: theme.palette.text.primary
  },
  title:{
    fontSize: 15,
    fontWeight: 600
  },
  description:{
    fontSize: 12,
    fontWeight: 400
  },
  need:{
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: 400,
    marginRight: 5
  },
  cardSubHeader:{
    fontSize: 11,
    fontWeight: 600
  },
  cardSubContent:{
    fontSize: 13,
    fontWeight: 500
  },
  buttonGrid:{
    borderRight: `1px solid ${theme.palette.border.secondary}`
  },
  oppActionIconPic:{
    marginRight: 10,
    width: 18,
    height: 18,
    color: theme.palette.text.primary
  },
  oppActionIcon:{
    marginRight: 10,
    fontSize: 18,
    color: theme.palette.text.primary
  },
  oppActionButton:{
    textTransform: 'capitalize',
    height: 30,
    color: theme.palette.text.primary,
    flexGrow: 1
  },
  moreIcon: { color: theme.palette.text.primary},
  progress: { color: theme.palette.text.primary},
  popover: {
    pointerEvents: 'none', // very important aspect
  },
  paper: {
    padding: theme.spacing.unit,
  },
})

class ExampleCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleCardOpen = this.handleCardOpen.bind(this);
  }

  handleCardOpen(cardModalPage, connectBool, permType){
    return e => {
      e.preventDefault();
      e.stopPropagation();
      let payload = {
        page: cardModalPage,
        connectBool,
        fake: true
      }
      this.props.openOppCard(payload);
    }
  }

  render(){
    const { classes } = this.props;

    let picture = <Img src={ExamplePicture}
      className={classes.pictureCover} />

    return (
      <div className={['feed-tutorial-tour', classes.opportunityCard].join(' ')}>
        <Grid container className={classes.oppCardGrid}>
          <Grid item xs={6} container alignItems='center'>
            <Grid item xs={4} container
              justify='center' alignItems='center'>
                <Avatar alt="profile-pic"
                  src={ExampleProfile}
                  className={classes.avatar}/>
            </Grid>
            <Grid container item xs={8} direction='column'
              justify='flex-start'>
              <Typography align='left' color="textPrimary"
                style={{ textTransform: 'capitalize', fontSize: 14}}>
                {`Joe Lopardo` }
              </Typography>
              <Typography align='left' color="textSecondary"
                onMouseEnter={this.handlePermissionsOpen}
                onMouseLeave={this.handlePermissionsClose}
                style={{ textTransform: 'capitalize', fontSize: 10}}>
                {`Bridgekin - 5 min`}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={6} container
            alignItems='center' justify='flex-end'>
            <Typography variant="body1" align='left'
              color="textSecondary" noWrap
              className={classes.need}>
              {`Sell`}
            </Typography>
          </Grid>
        </Grid>

        {picture}

        <Grid container justify='center'>
          <Grid item xs={10}>
            <div style={{ margin: "10px 0px"}}>
              <Typography variant="h5" align='left'
                color="textPrimary"
                className={classes.title} >
                {`An Amazing Opportunity Or Need`}
              </Typography>
            </div>
            <div style={{ margin: "10px 0px"}}>
              <Typography variant="body2" align='left'
                color="textPrimary"
                className={classes.description}>
                {`Here a user can add more details about the opportunity
                  or need. The more context they provide the more likely
                  whomever they share it with will be able to see if it's
                  a fit for them or someone they know.`}
              </Typography>
            </div>

            <div>
              <Typography variant="h6" align='left'
                color="textSecondary" noWrap
                className={classes.cardSubHeader}>
                Geography
              </Typography>
              <Typography variant="subtitle1" gutterBottom align='left'
                color="textPrimary" className={classes.cardSubContent}>
                <LinesEllipsis
                  text={`North America`}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                  />
              </Typography>
            </div>

            <div>
              <Typography variant="h6" align='left'
                color="textSecondary"
                className={classes.cardSubHeader}
                noWrap>
                Industry
              </Typography>
              <Typography variant="subtitle1" gutterBottom align='left'
                color="textPrimary" className={classes.cardSubContent}
                >
                <LinesEllipsis
                  text={`Technology & Internet`}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                  />
              </Typography>
            </div>

            <div>
              <Typography variant="h6" align='left'
                color="textSecondary"
                className={classes.cardSubHeader}
                noWrap>
                Value
              </Typography>
              <Typography variant="subtitle1" gutterBottom align='left'
                color="textPrimary" className={classes.cardSubContent}
                >
                {`$1M - $5M`}
              </Typography>
            </div>
          </Grid>

          <Grid container justify='space-around'
          className={classes.feedCardActionContainer}
          style={{ marginTop: 10}}>
            <Grid item xs={3}>
              <Button fullWidth
                onClick={this.handleCardOpen('confirm', true, '')}
                className='connect-step-tutorial-tour'
                classes={{ label: classes.oppActionButton }}>
                <img alt='connect' src={ConnectIcon}
                  className={classes.oppActionIconPic}/>
                Connect
              </Button>
            </Grid>

            <Grid item xs={3}>
              <Button fullWidth
                className='refer-step-tutorial-tour'
                classes={{ label: classes.oppActionButton }}>
                <img src={ReferIcon} alt=''
                  className={classes.oppActionIconPic}/>
                Refer
              </Button>
            </Grid>

            <Grid item xs={3}>
              <Button fullWidth
                classes={{ label: classes.oppActionButton }}>
                <BookmarkBorderIcon
                  className={classes.bookmark}/>
                Save
              </Button>
            </Grid>

            <Grid item xs={3}>
              <Button fullWidth
                classes={{ label: classes.oppActionButton }}>
                <CloseIcon className={classes.oppActionIcon}/>
                {`Pass`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExampleCard));
