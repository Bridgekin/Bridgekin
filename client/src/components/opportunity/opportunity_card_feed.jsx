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
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import CheckCircleIcon from '@material-ui/icons/CheckCircleSharp';
import CachedSharpIcon from '@material-ui/icons/CachedSharp';
import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import LinesEllipsis from 'react-lines-ellipsis';

import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilitySensor from 'react-visibility-sensor';

import CardModal from './card_modal';

import { PickImage } from '../../static/opportunity_images/image_util.js';
import _ from 'lodash';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { updateOpportunity, deleteOpportunity } from '../../actions/opportunity_actions';
import theme from '../theme';

import ConnectIcon from '../../static/opp_feed_icons/share-link.svg'
import ReferIcon from '../../static/opp_feed_icons/refer.png'
import PagePeel from '../../static/opp_feed_icons/page_peel.jpeg'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  deleteOpportunity: (id) => dispatch(deleteOpportunity(id)),
  updateOpportunity: (opp) => dispatch(updateOpportunity(opp)),
});

const styles = theme => ({
  feedCardActionContainer:{
    marginTop: 10,
    borderTop: `1px solid ${theme.palette.lightGrey}`,
    padding: 0
  },
  statusIndicator:{
    width: 8, height: 8,
    borderRadius: '50%',
    marginRight: 6
  },
  opportunityCard:{
    // marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    // width: '100%',
    // borderTop: `1px solid ${theme.palette.lightGrey}`,
    marginBottom: 9,
    border: `1px solid ${theme.palette.lightGrey}`,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 5,
    }
    // paddingBottom: 20
  },
  oppCardGrid:{
    padding: "0px 8px",
    [theme.breakpoints.up('sm')]: {
      padding: "0px 17px"
    }
  },
  oppStatus:{
    // height: 40,
    minWidth: 89,
    textTransform: 'uppercase',
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  pictureCover:{
    height: 140,
    width: '100%',
    objectFit: 'cover'
  },
  avatar:{
    width: 51,
    height: 51,
    margin: '12px 12px 12px 5px'
  },
  titlePost:{
    fontSize: 15,
    fontWeight: 500
  },
  titleCard:{
    fontSize: 20,
    fontWeight: 600
  },
  cardSubHeader:{
    fontSize: 14,
    fontWeight: 600
  },
  cardSubContent:{
    fontSize: 12,
    fontWeight: 600
  },
  oppActionIcon:{
    marginRight: 10,
    width: 12,
    height: 12
  },
  oppActionButton:{
    textTransform: 'capitalize',
    height: 45
  },
  pagePeel:{
    position: 'absolute',
    right: 0,
    width: 25,
    height: 25,
    borderTopRightRadius: 5,
    cursor: 'pointer'
  }
});


class OpportunityCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deleteOpen: false,
      cardOpen: false,
      connectBool: null,
      cardModalPage: 'sent',
      changeModalOpen: false,
      // dealStatusMenuOpen: false,
      dealStatusProgress: false,
      dealStatusAnchorEl: null
    }

    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleDeleteClose = this.handleDeleteClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleCardClose = this.handleCardClose.bind(this);
    this.handleDealStatusToggle = this.handleDealStatusToggle.bind(this);
    this.handleDealStatusSend = this.handleDealStatusSend.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
  }

  handleCardOpen(cardModalPage, connectBool){
    return e => {
      e.preventDefault();
      e.stopPropagation();
      // this.props.handleCardOpen(this.props.opportunity)
      this.setState({ cardOpen: true, cardModalPage, connectBool })
    }
  }

  handleCardClose(e){
    this.setState({ cardOpen: false })
  }

  handleDeleteOpen(e){
    // e.stopPropagation();
    console.log('open delete');
    this.setState({ deleteOpen: true });
  };

  handleDeleteClose(deleteBool){
    return (e) => {
      e.stopPropagation();
      if (deleteBool){
        this.props.deleteOpportunity(this.props.opportunity.id);
      }
      this.setState({ deleteOpen: false });
    }
  };

  handleEdit(e){
    // e.stopPropagation();
    // this.setState({ changeModalOpen: true})
    this.props.handleEditOpen();
  }

  handleDetailsClick(option){
    return e => {
      e.stopPropagation();
      const { detailsAnchorEl } = this.state;
      this.setState({ detailsAnchorEl: detailsAnchorEl ? null : e.currentTarget},
      () => {
        if (option && option === 'Edit'){
          this.handleEdit();
        } else if (option && option === 'Delete'){
          this.handleDeleteOpen();
        }
      })
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

  getStatusColor(status){
    switch(status) {
      case 'Active':
        return '#8EA863';
      case 'Pending':
        return '#F6E694';
      case 'Closed':
        return '#E88262';
      default:
        return '';
    }
  }

  render(){
    const { classes, opportunity, editable, demo,
      currentUser }= this.props;
    const { cardOpen, cardModalPage, connectBool,
    changeModalOpen, dealStatusMenuOpen,
    dealStatusProgress, dealStatusAnchorEl,
    detailsAnchorEl } = this.state;
    const detailsOpen = Boolean(detailsAnchorEl);

    let { title, description, industries, opportunityNeed, geography,
      value, status, pictureUrl, dealStatus, anonymous, viewType,
      ownerPictureUrl, ownerFirstName, ownerLastName } = opportunity;

    if (!_.isEmpty(opportunity)){
      let editOptions = editable ? (
        <Grid container justify='flex-start'
          className={classes.feedCardActionContainer}>
          <Grid item xs={6} container justify='center' alignItems='center'
            style={{borderRight: `1px solid ${theme.palette.grey1}`}}>
            <img alt='connect' src={ConnectIcon}/>
              <Button
                onClick={this.handleEdit}
                style={{ marginRight: 31}}>
                Edit
              </Button>
          </Grid>
          <Grid item xs={6} container justify='center' alignItems='center'>
            <img alt='refer' src={ReferIcon}/>
            <Button
              className={classes.button}
              onClick={this.handleDeleteOpen}>
              Delete
            </Button>
          </Grid>
        </Grid>
      ) : (<div></div>)

      let deleteDialog = editable ? (
        <Dialog
          open={this.state.deleteOpen}
          onClose={this.handleDeleteClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Your Opportunity"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`You about to delete your opportunity permanently.
                You can not undo this action. Do you still want to continue?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose(false)}
              color="secondary" >
              Cancel
            </Button>
            <Button autoFocus color='error' variant='contained'
              onClick={this.handleDeleteClose(true)}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : (<div></div>)

      // let cardIcon = this.getCardIcon(status);

      let loader = (
        <Grid container justify='center' alignItems='center'
          className={classes.loader}>
        </Grid>
      )
      // <CircularProgress className={classes.progress} />

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

      // {viewType === 'card' && <img src={PagePeel} className={classes.pagePeel}
      //   onClick={this.handleCardOpen('none', undefined)}
      //   alt='pagepeel'/>}

      return (
        <div className={classes.opportunityCard}>
          <Grid container className={classes.oppCardGrid}>
            <Grid item xs={7} container alignItems='center'>
              {ownerPictureUrl && !anonymous ? (
                <Avatar alt="profile-pic"
                  src={ownerPictureUrl}
                  className={classes.avatar} />
              ) : (
                <AccountCircle className={classes.avatar} />
              )}
              <Typography gutterBottom align='Left'
                className={classes.cardHeader}
                style={{ textTransform: 'capitalize'}}>
                {anonymous ? 'Anonymous' : `${ownerFirstName} ${ownerLastName}`}
              </Typography>
            </Grid>

            <Grid item xs={5} container alignItems='center' justify='flex-end'>
              <Button className={classes.oppStatus}
                aria-owns={dealStatusAnchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleDealStatusToggle}
                disabled={dealStatusProgress}
                >
                <div className={classes.statusIndicator}
                  style={{ backgroundColor: `${this.getStatusColor(dealStatus)}` }}/>
                {dealStatus}
              </Button>

              {editable && <Menu
                id="simple-menu"
                anchorEl={dealStatusAnchorEl}
                open={Boolean(dealStatusAnchorEl)}
                onClose={this.handleDealStatusToggle}
              >
                {['Active', 'Pending', 'Closed'].map(option => (
                  <MenuItem onClick={this.handleDealStatusSend(option)}>
                    <div className={classes.statusIndicator}
                      style={{ backgroundColor: `${this.getStatusColor(option)}` }}/>
                    {option}
                  </MenuItem>
                ))}
              </Menu>}

              {(viewType === 'card' || (viewType === 'post' && editable)) &&
                <IconButton
                aria-label="More"
                aria-owns={detailsOpen ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={(editable ? this.handleDetailsClick():
                  this.handleCardOpen('opportunity', true))}
                style={{ padding: 6}}
              >
                <MoreVertIcon />
              </IconButton>}

              <Menu
                id="long-menu"
                anchorEl={detailsAnchorEl}
                open={detailsOpen}
                onClose={this.handleDetailsClick()}
              >
                {['Edit', 'Delete'].map(option => (
                  <MenuItem key={option}
                    onClick={this.handleDetailsClick(option)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>

          {picture}

          <Grid container justify='center'>
            <Grid item xs={10} style={{ paddingTop: 14}}>
              {opportunity.title &&
                opportunity.viewType === 'card' &&
                <div className={classes.cardHeaderWrapper}>
                  <Typography variant="h5" align='left'
                    color="default"
                    className={opportunity.viewType === 'card' ?
                      classes.titleCard : classes.titlePost} >
                    <LinesEllipsis
                      text={title}
                      maxLine='2'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                      />
                  </Typography>
                </div>}
              {opportunity.description &&
                <div className={classes.cardDescriptionWrapper}>
                  <Typography variant="body2" align='left'
                    color="default" className={classes.description}
                    >
                    <LinesEllipsis
                      text={description}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                      />
                  </Typography>
                </div>}

              <Grid container justify='flex-start' spacing={16}
                style={{ margin: "10px 0px 10px 0px" }}>
                {opportunity.geography.length > 0 &&
                  opportunity.viewType === 'card' &&
                  <Grid item xs={4} md={4}>
                    <Typography variant="h6" gutterBottom align='left'
                      className={classes.cardSubHeader} noWrap>
                      Geography
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align='left'
                      color="default" className={classes.cardSubContent}>
                      <LinesEllipsis
                        text={geography.join(", ")}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                        />
                    </Typography>
                  </Grid>}

                {opportunity.industries.length > 0 &&
                  opportunity.viewType === 'card' &&
                  <Grid item xs={4} md={4}>
                    <Typography variant="h6" gutterBottom align='left'
                      className={classes.cardSubHeader}
                      noWrap>
                      Industry
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align='left'
                      color="default" className={classes.cardSubContent}
                      >
                      <LinesEllipsis
                        text={opportunity.industries.join(", ")}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                        />
                    </Typography>
                  </Grid>}

                {opportunity.value &&
                  opportunity.viewType === 'card' &&
                  <Grid item xs={3}>
                    <Typography variant="h6" gutterBottom align='left'
                      className={classes.cardSubHeader}
                      noWrap>
                      Value
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align='left'
                      color="default" className={classes.cardSubContent}
                      >
                      {opportunity.value}
                    </Typography>
                  </Grid>}
              </Grid>
            </Grid>

            <Grid container justify='flex-start'
              className={classes.feedCardActionContainer}>
              <Grid item xs={6} container justify='center' alignItems='center'
                style={{borderRight: `1px solid ${theme.palette.grey1}`}}>
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
              { editable && false &&
                <Grid item xs={3} container justify='center' alignItems='center'
                  style={{borderLeft: `1px solid ${theme.palette.grey1}`, borderRight: `1px solid ${theme.palette.grey1}`}}>
                  <Button onClick={this.handleEdit}>
                    <img alt='connect' src={ConnectIcon}
                      className={classes.oppActionIcon}/>
                    Edit
                  </Button>
                </Grid>}
              { editable && false &&
                <Grid item xs={3} container justify='center' alignItems='center'>
                  <Button onClick={this.handleDeleteOpen}>
                    <img alt='refer' src={ReferIcon}
                      className={classes.oppActionIcon}/>
                    Delete
                  </Button>
                </Grid>
              }

            </Grid>
            {editable && deleteDialog}
          </Grid>

          <CardModal
            open={cardOpen}
            page={cardModalPage}
            connectBool={connectBool}
            handleClose={this.handleCardClose}
            opportunity={opportunity}
            demo={demo}
            viewType={viewType}/>
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
