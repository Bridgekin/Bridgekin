import React from 'react';
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

const styles = theme => ({
  feedCardActionContainer:{
    margin: "10px 0px 20px 0px",
    borderTop: `1px solid ${theme.palette.lightGrey}`,
    padding: 10
  },
  statusIndicator:{
    width: 8, height: 8,
    borderRadius: '50%',
    marginRight: 6
  }
});


class OpportunityCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deleteOpen: false,
      cardOpen: false,
      connectBool: null,
      cardModalPage: 'sent'
    }

    this.handleCardOpen = this.handleCardOpen.bind(this);
    // this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    // this.handleDeleteClose = this.handleDeleteClose.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleCardClose = this.handleCardClose.bind(this);
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

  // handleDeleteOpen = (e) => {
  //   e.stopPropagation();
  //   this.setState({ deleteOpen: true });
  // };
  //
  // handleDeleteClose(deleteBool){
  //   return (e) => {
  //     e.stopPropagation();
  //     if (deleteBool){
  //       this.props.handleDelete(this.props.opportunity.id);
  //     }
  //     this.setState({ deleteOpen: false });
  //   }
  // };

  // handleEdit(id){
  //   return e => {
  //     e.stopPropagation();
  //     this.props.history.push(`/editopportunity/${id}`)
  //   }
  // }

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
    const { classes, opportunity, editable, demo, currentUser }= this.props;
    const { cardOpen, cardModalPage, connectBool } = this.state;
    let { title, description, industries, opportunityNeed, geography,
      value, status, pictureUrl, dealStatus } = opportunity;

    if (!_.isEmpty(opportunity)){

      // let additionalInfo = editable ? (
      //   <div className={classes.cardSubWrapper}>
      //     <div>
      //       <Typography variant="h6" gutterBottom align='left'
      //         color="secondary" className={classes.cardSubHeader}>
      //         Status
      //       </Typography>
      //       <Typography variant="subtitle1" gutterBottom align='left'
      //         color="default" className={classes.cardSubContentStatus}>
      //         {status}
      //       </Typography>
      //     </div>
      //
      //     <div>
      //       <Typography variant="h6" gutterBottom align='left'
      //         color="secondary" className={classes.cardSubHeader}>
      //         Opportunity Need
      //       </Typography>
      //       <Typography variant="subtitle1" gutterBottom align='left'
      //         color="default" className={classes.cardSubContentStatus}>
      //         {opportunityNeed}
      //       </Typography>
      //     </div>
      //   </div>
      // ): (<div></div>)
      //
      // let editOptions = editable ? (
      //   <div className={classes.buttonWrapper}>
      //     <Button variant="contained" className={classes.button}
      //       onClick={this.handleEdit(opportunity.id)}>
      //       Edit
      //     </Button>
      //     <Button variant="contained" className={classes.button}
      //       onClick={this.handleDeleteOpen}>
      //       Delete
      //     </Button>
      //   </div>
      // ) : (<div></div>)
      //
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
      //       <Button onClick={this.handleDeleteClose(false)}
      //         color="secondary" >
      //         Cancel
      //       </Button>
      //       <Button autoFocus color='error' variant='contained'
      //         onClick={this.handleDeleteClose(true)}>
      //         Delete
      //       </Button>
      //     </DialogActions>
      //   </Dialog>
      // ) : (<div></div>)

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
            className={classes.cover}
            loader={loader}
            />
        </VisibilitySensor>
      ) : undefined

      return (
        <CardActionArea className={classes.opportunityCard}
          onClick={this.handleCardOpen('none', undefined)}>
          <Grid container style={{ padding: "0px 17px"}}>
            <Grid item xs={6} container alignItems='center'>
              <IconButton
                onClick={() => this.props.history.push('/')}
                color="secondary"
                >
                {currentUser.profilePicUrl ? (
                  <Avatar alt="profile-pic"
                    src={currentUser.profilePicUrl}
                    className={classes.avatar} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Typography gutterBottom align='Left'
                className={classes.cardHeader}
                style={{ textTransform: 'capitalize'}}>
                {currentUser.fname}
              </Typography>
            </Grid>

            <Grid item xs={6} container alignItems='center' justify='flex-end'>
              <div className={classes.oppStatus}>
                <div className={classes.statusIndicator}
                  style={{ backgroundColor: `${this.getStatusColor(dealStatus)}` }}/>
                {dealStatus}
              </div>
            </Grid>
          </Grid>

          {picture}

          <Grid container justify='center'>
            <Grid item xs={10} style={{ paddingTop: 14}}>
              {opportunity.title && <div className={classes.cardHeaderWrapper}>
                <Typography variant="h5" align='left'
                  color="default" className={classes.title} >
                  <LinesEllipsis
                    text={title}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    />
                </Typography>
              </div>}
              {opportunity.description && <div className={classes.cardDescriptionWrapper}>
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
                {opportunity.geography.length>0 && <Grid item xs={4} md={4}>
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

                {opportunity.geography.length>0 && <Grid item xs={4} md={4}>
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

                {opportunity.value && <Grid item xs={3}>
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

              <Grid container justify='flex-start' spacing={16}
                className={classes.feedCardActionContainer}>
                <Button color='primary' variant='contained'
                  style={{ marginRight: 31}}
                  onClick={this.handleCardOpen('confirm', true)}>
                  Connect
                </Button>

                <Button color='primary' variant='contained'
                  onClick={this.handleCardOpen('confirm', false)}>
                  Refer
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <CardModal
            open={cardOpen}
            page={cardModalPage}
            type={connectBool}
            handleClose={this.handleCardClose}
            opportunity={opportunity}
            demo={demo}/>
        </CardActionArea>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default withRouter(withStyles(styles)(OpportunityCard));
