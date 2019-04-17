import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import CheckCircleIcon from '@material-ui/icons/CheckCircleSharp';
import CachedSharpIcon from '@material-ui/icons/CachedSharp';
import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CloseIcon from '@material-ui/icons/Close';
import LinesEllipsis from 'react-lines-ellipsis';

import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilitySensor from 'react-visibility-sensor';

// import CardModal from './card_modal';

import { PickImage } from '../../static/opportunity_images/image_util.js';
import _ from 'lodash';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { fetchUserOpportunities,
  updateOpportunity, deleteOpportunity } from '../../actions/opportunity_actions';
import { createSavedOppportunity, deleteSavedOppportunity}
  from '../../actions/saved_opportunity_actions';
import { openOppCard, openDirectLink,
  openOppChange, openDeleteOpp } from '../../actions/modal_actions';
import { createDirectLink } from '../../actions/direct_link_actions';
import { createPassedOpportunity, deletePassedOpportunity } from '../../actions/passed_opportunity_actions';
import theme from '../theme';

import ConnectIcon from '../../static/opp_feed_icons/share-link.svg'
import ReferIcon from '../../static/opp_feed_icons/refer.png'
import PagePeel from '../../static/opp_feed_icons/page_peel.jpeg'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/EditSharp';

import ReadMoreReact from 'read-more-react';
import ReadMoreAndLess from 'react-read-more-less';
import datetimeDifference from "datetime-difference";

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  savedOpportunities: state.entities.savedOpportunities,
  networks: state.entities.networks,
  connections: state.entities.connections,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  createPassedOpportunity: (oppId) => dispatch(createPassedOpportunity(oppId)),
  deletePassedOpportunity: (oppId) => dispatch(deletePassedOpportunity(oppId)),
  openOppCard: (payload) => dispatch(openOppCard(payload)),
  openDirectLink: (opp) => dispatch(openDirectLink(opp)),
  openOppChange: (payload) => dispatch(openOppChange(payload)),
  openDeleteOpp: (oppId) => dispatch(openDeleteOpp(oppId)),
  fetchUserOpportunities: () => dispatch(fetchUserOpportunities()),
  // deleteOpportunity: (id) => dispatch(deleteOpportunity(id)),
  updateOpportunity: (opp) => dispatch(updateOpportunity(opp)),
  createSavedOppportunity: (opportunityId) => dispatch(createSavedOppportunity(opportunityId)),
  deleteSavedOppportunity: (savedOpportunity) => dispatch(deleteSavedOppportunity(savedOpportunity)),
  createDirectLink: (oppIds) => dispatch(createDirectLink(oppIds)),
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
  pagePeel:{
    position: 'absolute',
    right: 0,
    width: 25,
    height: 25,
    borderTopRightRadius: 5,
    cursor: 'pointer'
  },
  moreIcon: { color: theme.palette.text.primary},
  progress: { color: theme.palette.text.primary},
  popover: {
    pointerEvents: 'none', // very important aspect
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

const abbrevDateName = {
  'seconds': 'sec',
  'minutes': 'min',
  'hours': 'h',
  'days': 'd',
  'months': 'mo',
  'years': 'yr'
}

class OpportunityCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deleteOpen: false,
      // cardOpen: false,
      connectBool: null,
      cardModalPage: 'sent',
      // changeModalOpen: false,
      // dealStatusMenuOpen: false,
      dealStatusProgress: false,
      dealStatusAnchorEl: null,
      permissionsAnchorEl: null,
      passedOppLoading: false
    }

    this.handleCardOpen = this.handleCardOpen.bind(this);
    // this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    // this.handleDeleteClose = this.handleDeleteClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleCardClose = this.handleCardClose.bind(this);
    this.handleDealStatusToggle = this.handleDealStatusToggle.bind(this);
    this.handleDealStatusSend = this.handleDealStatusSend.bind(this);
    this.handleFeedActions = this.handleFeedActions.bind(this);
    this.toggleSavedOpportunity = this.toggleSavedOpportunity.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.getNotificationDate = this.getNotificationDate.bind(this);
    this.getPermissionLabel = this.getPermissionLabel.bind(this);
    this.handlePermissionsOpen = this.handlePermissionsOpen.bind(this);
    this.handlePermissionsClose = this.handlePermissionsClose.bind(this);
    this.getPermissionsPopover = this.getPermissionsPopover.bind(this);
  }

  handleCardOpen(cardModalPage, connectBool){
    return e => {
      e.preventDefault();
      e.stopPropagation();
      // this.props.handleCardOpen(this.props.opportunity)
      // this.setState({ cardOpen: true, cardModalPage, connectBool })
      const { opportunity } = this.props;
      let payload = {
        oppId: opportunity.id,
        page: cardModalPage,
        connectBool
      }
      this.props.openOppCard(payload);
    }
  }

  handlePass(e){
    this.setState({ passedOppLoading: true }
    ,() => {
      e.stopPropagation()
      const { passed } = this.props;
      if(!passed){
        this.props.createPassedOpportunity(this.props.opportunity.id)
        .then(() => this.setState({ passedOppLoading: false }))
      } else {
        this.props.deletePassedOpportunity(this.props.opportunity.id)
        .then(() => this.setState({ passedOppLoading: false }))
      }
    })
  }

  handleEdit(e){
    let payload = {
      opportunity: this.props.opportunity,
      mode: 'update',
    }
    // debugger
    this.props.openOppChange(payload);
  }

  handleCardClose(e){
    this.setState({ cardOpen: false })
  }

  // handleDeleteOpen(e){
  //   // e.stopPropagation();
  //   // console.log('open delete');
  //   // this.setState({ deleteOpen: true });
  //   this.props.openDeleteOpp(this.props.opportunity.id)
  // };

  // handleDeleteClose(deleteBool){
  //   return (e) => {
  //     e.stopPropagation();
  //     if (deleteBool){
  //       this.props.deleteOpportunity(this.props.opportunity.id)
  //       .then(() => this.props.fetchUserOpportunities())
  //     }
  //     this.setState({ deleteOpen: false });
  //   }
  // };


  // handleDetailsClick(option){
  //   return e => {
  //     e.stopPropagation();
  //     const { detailsAnchorEl } = this.state;
  //     this.setState({ detailsAnchorEl: detailsAnchorEl ? null : e.currentTarget},
  //     () => {
  //       if (option && option === 'Edit'){
  //         this.handleEdit();
  //       } else if (option && option === 'Delete'){
  //         this.handleDeleteOpen();
  //       } else if (option && option === 'Share'){
  //         this.props.createDirectLink([this.props.opportunity.id])
  //         .then(() => this.props.openDirectLink())
  //       }
  //     })
  //   }
  // }

  handleFeedActions(option){
    return e => {
      e.stopPropagation();
      if (option && option === 'Edit'){
        this.handleEdit();
      } else if (option && option === 'Delete'){
        // this.handleDeleteOpen();
        this.props.openDeleteOpp(this.props.opportunity.id)
      } else if (option && option === 'Share'){
        this.props.createDirectLink([this.props.opportunity.id])
        .then(() => this.props.openDirectLink())
      }
    }
  }

  toggleSavedOpportunity(e){
    e.stopPropagation();
    const { savedOpportunities, opportunity } = this.props;
    let savedOpportunity = savedOpportunities[opportunity.id];
    if (savedOpportunity){
      this.props.deleteSavedOppportunity(savedOpportunity)
    } else {
      this.props.createSavedOppportunity(opportunity.id)
    }
  }

  handleDealStatusToggle(e){
    e.stopPropagation();
    const { dealStatusAnchorEl } = this.state;
    this.setState({ dealStatusAnchorEl: dealStatusAnchorEl ? null : e.currentTarget })
  }

  handleDealStatusSend(value){
    return e => {
      e.stopPropagation();
      this.setState({ dealStatusProgress: true },
      () => {
        const formData = new FormData();

        formData.append(`opportunity[id]`, this.props.opportunity.id);
        formData.append(`opportunity[dealStatus]`, value);

        this.props.updateOpportunity(formData)
        .then(() => this.setState({
          dealStatusAnchorEl: null,
          dealStatusProgress: false
        }))
      })
    }
  }

  handleProfilePage(id){
    return e => {
      e.stopPropagation();
      if(this.props.currentUser.isAdmin){
        this.props.history.push(`/mynetwork/profile/${id}`)
      }
    }
  }

  getNotificationDate(){
    let then = new Date(this.props.opportunity.createdAt);
    const result = datetimeDifference(then, new Date());
    const resultKey = Object.keys(result)
      .filter(k => !!result[k])[0]
    // debugger
    return `${result[resultKey]}${abbrevDateName[resultKey]}`
  }

  getStatusColor(status){
    switch(status) {
      case 'Active':
        return '#8EA863';
      case 'Pending':
        return '#F6E694';
      case 'Closed':
        return '#E88262';
      case 'Deleted':
        return '#000000';
      default:
        return '';
    }
  }

  getPermissionLabel(){
    const { permission, permType, networks,
      currentUser, opportunity} = this.props;
    let shareLength = Object.values(permission.sharePerms).reduce((acc, opts) => (
      acc + opts.length), 0);
    // debugger
    if(permType === 'direct'){
      return `Direct ` +
        (((shareLength > 1) && (currentUser.id === opportunity.ownerId)) ?
        `(${shareLength})` : ``) + `- `
    } else if(permType === 'indirect'){
      return `Connections ` +
        (((shareLength > 1) && (currentUser.id === opportunity.ownerId)) ?
        `(${shareLength})` : ``) + `- `
    } else if(permType === 'network'){
      let networkTitle = networks[permission.sharePerms.network[0]].title
      return `Bridgekin - `
    }
    return 'Shared - '
  }

  handlePermissionsOpen(e){
    e.stopPropagation()
    const { currentUser, opportunity } = this.props;
    if(currentUser.id === opportunity.ownerId){
      this.setState({ permissionsAnchorEl: e.currentTarget})
    }
  }

  handlePermissionsClose(e){
    e.stopPropagation()
    const { currentUser, opportunity } = this.props;
    if(currentUser.id === opportunity.ownerId){
      this.setState({ permissionsAnchorEl: null})
    }
  }

  getPermissionsPopover(){
    const { networks, connections, permission,
      currentUser, opportunity, users } = this.props;

    let content = ['direct', 'indirect', 'network'].filter(perm => permission.sharePerms[perm].length > 0)
      .map(type => {
        let label = type === 'direct' ? 'direct' :
          (type === 'indirect' ? 'Connections' : 'Network')
        let title = <Typography color='textSecondary' gutterBottom
          style={{ textTransform: 'capitalize', fontSize: 9}}>
          <u>{label}</u>
        </Typography>

        let shares = permission.sharePerms[type].map(id => {
          let name = ''
          if (type === 'network'){
            name = networks[id].title;
          } else {
            let connection = connections[id];
            let friendId = (currentUser.id !== connection.userId) ?
            connection.userId : connection.friendId
            let friend = users[friendId];
            name = `${friend.fname} ${friend.lname}`
          }
          return <Typography color='textPrimary' gutterBottom
            style={{ textTransform: 'capitalize', fontSize: 9}}>
            {name}
          </Typography>
        })
        return <Grid container direction='column'>
          {title}
          {shares}
        </Grid>
      })

    return content
  }

  render(){
    const { classes, opportunity, editable,
      demo, currentUser, savedOpportunities,
      permType, showPerms, passed }= this.props;

    const { cardOpen, cardModalPage, connectBool,
    changeModalOpen, dealStatusMenuOpen,
    dealStatusProgress, dealStatusAnchorEl,
    detailsAnchorEl, passedOppLoading,
    permissionsAnchorEl } = this.state;

    const detailsOpen = Boolean(detailsAnchorEl);

    if (!_.isEmpty(opportunity)){
      let { title, description, industries, opportunityNeed, geography,
        value, status, pictureUrl, dealStatus, anonymous, viewType,
        ownerPictureUrl, ownerFirstName, ownerLastName, ownerId } = opportunity;

      // let deleteDialog = editable ? (
      //   <Dialog
      //     open={this.state.deleteOpen}
      //     onClose={this.handleDeleteClose(false)}
      //     aria-labelledby="alert-dialog-title"
      //     aria-describedby="alert-dialog-description"
      //   >
      //     <DialogTitle id="alert-dialog-title">{"Delete Your Opportunity"}</DialogTitle>
      //     <DialogContent>
      //       <DialogContentText id="alert-dialog-description">
      //         {`You about to delete your opportunity permanently.
      //           You can not undo this action. Do you still want to continue?`}
      //       </DialogContentText>
      //     </DialogContent>
      //     <DialogActions>
      //       <Button onClick={this.handleDeleteClose(false)}>
      //         Cancel
      //       </Button>
      //       <Button autoFocus variant='contained'
      //         className={classes.delete}
      //         onClick={this.handleDeleteClose(true)}>
      //         Delete
      //       </Button>
      //     </DialogActions>
      //   </Dialog>
      // ) : (<div></div>)

      // let cardIcon = this.getCardIcon(status);

      let loader = (
        <Grid container justify='center' alignItems='center'
          color="textPrimary" className={classes.loader}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )

      let picture = opportunity.pictureUrl ? (
        <VisibilitySensor>
          <Img src={opportunity.pictureUrl}
            className={classes.pictureCover}
            loader={loader}
            />
        </VisibilitySensor>
      ) : undefined

      // ( viewType === 'card' &&
      //   <VisibilitySensor>
      //     <Img src={PickImage(industries[0])}
      //       className={classes.pictureCover}
      //       loader={loader}
      //       />
      //   </VisibilitySensor>
      // )

      return (
        <div className={classes.opportunityCard}>
          <Grid container className={classes.oppCardGrid}>
            <Grid item xs={6} container alignItems='center'>
              <Grid item xs={4} container
                justify='center' alignItems='center'>
                {ownerPictureUrl && !anonymous ? (
                  <Avatar alt="profile-pic"
                    src={ownerPictureUrl}
                    className={classes.avatar}
                    onClick={this.handleProfilePage(ownerId)}/>
                ) : (
                  <AccountCircle
                    className={classes.avatar}
                    onClick={this.handleProfilePage(ownerId)}/>
                )}
              </Grid>
              <Grid container item xs={8} direction='column'
                justify='flex-start'>
                <Typography align='left' color="textPrimary"
                  style={{ textTransform: 'capitalize', fontSize: 14}}>
                  {anonymous ? 'Anonymous' : `${ownerFirstName} ${ownerLastName}`}
                </Typography>
                <Typography align='left' color="textSecondary"
                  onMouseEnter={this.handlePermissionsOpen}
                  onMouseLeave={this.handlePermissionsClose}
                  style={{ textTransform: 'capitalize', fontSize: 10}}>
                  {showPerms ? this.getPermissionLabel() : 'Shared - '}
                  {this.getNotificationDate()}
                </Typography>
                {showPerms && <Popover
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  anchorEl={permissionsAnchorEl}
                  open={Boolean(permissionsAnchorEl)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={this.handlePermissionsClose}
                  disableRestoreFocus
                >
                  {this.getPermissionsPopover()}
                </Popover>}
              </Grid>
            </Grid>

            <Grid item xs={6} container
              alignItems='center' justify='flex-end'>
              <Typography variant="body1" align='left'
                color="textSecondary" noWrap
                className={classes.need}>
                {opportunityNeed}
              </Typography>
              {/*<Button className={classes.oppStatus}
                aria-owns={dealStatusAnchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleDealStatusToggle}
                disabled={dealStatusProgress}
                >
                <div className={classes.statusIndicator}
                  style={{ backgroundColor: `${this.getStatusColor(dealStatus)}` }}/>
                <Typography align='left' color="textPrimary"
                  style={{ fontSize: 14, fontWeight: 600 }}>
                  {dealStatus}
                </Typography>
              </Button>*/}

              {editable && <Menu
                id="simple-menu"
                anchorEl={dealStatusAnchorEl}
                open={Boolean(dealStatusAnchorEl)}
                onClose={this.handleDealStatusToggle}
              >
                {['Active', 'Pending', 'Closed'].map(option => (
                  <MenuItem color="textPrimary"
                    onClick={this.handleDealStatusSend(option)}>
                    <div className={classes.statusIndicator}
                      style={{ backgroundColor: `${this.getStatusColor(option)}` }}/>
                      {option}
                  </MenuItem>
                ))}
              </Menu>}

              {/*(currentUser.id === ownerId && editable) &&
                <IconButton
                aria-label="More"
                aria-owns={detailsOpen ? 'long-menu' : undefined}
                aria-haspopup="true"
                classes={{ label: classes.moreIcon}}
                onClick={( (editable) ?
                  this.handleDetailsClick() :
                  this.handleCardOpen('opportunity', true) )}
                style={{ padding: 6}}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="long-menu"
                anchorEl={detailsAnchorEl}
                open={detailsOpen}
                onClose={this.handleDetailsClick()}
              >
                {['Edit', 'Delete', 'Share'].map(option => (
                  <MenuItem key={option} color="textPrimary"
                    onClick={this.handleDetailsClick(option)}>
                    {option}
                  </MenuItem>
                ))}

              </Menu>*/}
            </Grid>
          </Grid>

          {picture}

          <Grid container justify='center'>
            <Grid item xs={10}>
              {opportunity.title &&
                <div style={{ margin: "10px 0px"}}>
                  <Typography variant="h5" align='left'
                    color="textPrimary"
                    className={classes.title} >
                    {title}
                  </Typography>
                </div>}
              {opportunity.description &&
                <div style={{ margin: "10px 0px"}}>
                  <Typography variant="body2" align='left'
                    color="textPrimary"
                    className={classes.description}>
                    <ReadMoreAndLess
                      charLimit={200}
                      readMoreText="Read more"
                      readLessText="Read less">
                      {description}
                    </ReadMoreAndLess>
                  </Typography>
                </div>}

              {opportunity.geography.length > 0 &&
                <div>
                  <Typography variant="h6" align='left'
                    color="textSecondary" noWrap
                    className={classes.cardSubHeader}>
                    Geography
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom align='left'
                    color="textPrimary" className={classes.cardSubContent}>
                    <LinesEllipsis
                      text={geography.join(", ")}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                      />
                  </Typography>
                </div>}

              {opportunity.industries.length > 0 &&
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
                      text={opportunity.industries.join(", ")}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                      />
                  </Typography>
                </div>}

              {opportunity.value &&
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
                    {opportunity.value}
                  </Typography>
                </div>}
              </Grid>

            {/*<Grid container justify='flex-start'
              className={classes.feedCardActionContainer}>
              <Grid item xs={6} container justify='center' alignItems='center'
                className={classes.buttonGrid}>
                <Button onClick={this.handleCardOpen('confirm', true)}
                  classes={{ label: classes.oppActionButton }} fullWidth>
                  <img alt='connect' src={ConnectIcon}
                    className={classes.oppActionIcon}
                    style={{ width: 14, height: 14}}/>
                  Connect
                </Button>
              </Grid>
              <Grid item xs={6} container justify='center' alignItems='center'>
                <Button onClick={this.handleCardOpen('confirm', false)}
                  classes={{ label: classes.oppActionButton }} fullWidth>
                  <img alt='refer' src={ReferIcon}
                    className={classes.oppActionIcon}/>
                  Refer
                </Button>
              </Grid>
            </Grid>*/}

            {currentUser.id !== ownerId ? (
              <Grid container justify='space-around'
              className={classes.feedCardActionContainer}
              style={{ marginTop: 10}}>
                <Grid item xs={3}>
                  <Button fullWidth
                    onClick={this.handleCardOpen('confirm', true)}
                    classes={{ label: classes.oppActionButton }}>
                    <img alt='connect' src={ConnectIcon}
                      className={classes.oppActionIconPic}/>
                    Connect
                  </Button>
                </Grid>

                <Grid item xs={3}>
                  <Button fullWidth
                    onClick={this.handleCardOpen('confirm', false)}
                    classes={{ label: classes.oppActionButton }}>
                    <img src={ReferIcon} alt=''
                      className={classes.oppActionIconPic}/>
                    Refer
                  </Button>
                </Grid>

                <Grid item xs={3}>
                  {(savedOpportunities[opportunity.id] ?
                    <Button fullWidth
                      disabled={!currentUser || editable}
                      classes={{ label: classes.oppActionButton }}>
                      <BookmarkIcon
                        onClick={this.toggleSavedOpportunity}
                        className={classes.bookmark}/>
                      Save
                    </Button> :
                    <Button fullWidth
                      classes={{ label: classes.oppActionButton }}>
                      <BookmarkBorderIcon
                        onClick={this.toggleSavedOpportunity}
                        className={classes.bookmark}/>
                      Save
                    </Button>)}
                </Grid>

                <Grid item xs={3}>
                  <Button fullWidth
                    onClick={this.handlePass}
                    disabled={!currentUser || passedOppLoading}
                      classes={{ label: classes.oppActionButton }}>
                    {passedOppLoading ? <CircularProgress className={classes.oppActionIcon}/> :
                    <CloseIcon className={classes.oppActionIcon}/>}
                    {passed ? `Unpass` : `Pass`}
                  </Button>
                </Grid>
              </Grid> ) : (
              <Grid container justify='space-around'
              className={classes.feedCardActionContainer}>
                <Grid item xs={4}>
                  <Button fullWidth
                    onClick={this.handleFeedActions('Share')}
                    classes={{ label: classes.oppActionButton }}>
                    <ShareIcon
                      className={classes.oppActionIconPic}/>
                    Share
                  </Button>
                </Grid>

                <Grid item xs={4}>
                  <Button fullWidth
                    onClick={this.handleFeedActions('Edit')}
                    classes={{ label: classes.oppActionButton }}>
                    <EditIcon
                      className={classes.oppActionIconPic}/>
                    Edit
                  </Button>
                </Grid>

                <Grid item xs={4}>
                  <Button fullWidth
                    onClick={this.handleFeedActions('Delete')}
                    classes={{ label: classes.oppActionButton }}>
                    <CloseIcon
                      className={classes.oppActionIconPic}/>
                    Delete
                  </Button>
                </Grid>

              </Grid> )}

            {/*editable && deleteDialog*/}
          </Grid>

          {/*<CardModal
            open={cardOpen}
            page={cardModalPage}
            connectBool={connectBool}
            opportunity={opportunity}
            demo={demo}
            viewType={viewType}/>*/}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(OpportunityCard)));

// <Button className={classes.oppStatus}
//   buttonRef={node => {
//       this.dealStatusAnchorEl = node;
//     }}
//   aria-owns={dealStatusMenuOpen ? 'menu-list-grow' : undefined}
//   aria-haspopup="true"
//   onClick={this.handleDealStatusToggle}
//   disabled={dealStatusProgress}
//   >

// <Popper open={dealStatusMenuOpen} anchorEl={this.dealStatusAnchorEl} transition disablePortal>
//   {({ TransitionProps, placement }) => (
//     <Grow
//       {...TransitionProps}
//       id="menu-list-grow"
//       style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//     >
//       <Paper>
//         <ClickAwayListener onClickAway={this.handleDealStatusToggle}>
//           <MenuList>
//             {['Active', 'Pending', 'Closed'].map(option => (
//               <MenuItem onClick={this.handleDealStatusSend(option)}>
//                 <div className={classes.statusIndicator}
//                   style={{ backgroundColor: `${this.getStatusColor(option)}` }}/>
//                 {option}
//               </MenuItem>
//             ))}
//           </MenuList>
//         </ClickAwayListener>
//       </Paper>
//     </Grow>
//   )}
// </Popper>
