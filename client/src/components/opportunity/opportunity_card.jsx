import React from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
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

import CheckCircleIcon from '@material-ui/icons/CheckCircleSharp';
import WarningSharpIcon from '@material-ui/icons/WarningSharp';
import BlockSharpIcon from '@material-ui/icons/BlockSharp';

import CardModal from './card_modal';

import { PickImage } from '../../static/opportunity_images/image_util.js';
import _ from 'lodash';

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  cover: {
    height: 140,
    width: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 440,
    width: '100%'
  },
  content:{
    padding: "10px 30px 0px 30px"
  },
  cardHeaderWrapper:{
    marginBottom: 10,
  },
  cardDescriptionWrapper:{
    marginBottom: 5,
  },
  cardSubWrapper:{
    display: 'flex',
    justifyContent: 'space-around',
    margin: "10px 0px 10px 0px"
  },
  cardSubHeader:{
    fontWeight: 700
  },
  cardSubContent:{
    height: 55,
    lineHeight: 1,
    overflowY: 'hidden'
  },
  cardSubContentStatus:{
    fontSize: '0.85rem',
    fontWeight: 500,
    lineHeight: 1,
    maxHeight: 52,
    overflowY: 'hidden'
  },
  title: {
    // fontSize: '1.5rem',
    maxHeight: 80,
    overflowY: 'hidden',
    margin: "10px 0px"
    // textOverflow: 'ellipse'
  },
  description: {
    // fontSize: '0.9rem',
    maxHeight: 74,
    overflowY: 'hidden',
    display: '-webkit-box',
    // lineHeight: 0.5,
    // whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    webkitLineClamp: 3,
    webkitBoxOrient:'vertical'
  },
  buttonWrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    width: '85%'
  },
  button: {
    minWidth: 75,
    marginRight: '15%',
    marginBottom: 30,
    backgroundColor: theme.palette.grey2,
    color: theme.palette.text.tertiary
  },
  delete:{
    backgroundColor: theme.palette.delete,
    color: theme.palette.primary.main
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.grey2}`,
    borderRadius: '50%',
    backgroundColor: theme.palette.white
  }
});


class OpportunityCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deleteOpen: false,
      cardOpen: false
    }

    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleDeleteClose = this.handleDeleteClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleCardClose = this.handleCardClose.bind(this);
  }

  handleCardOpen(e){
    e.preventDefault();
    // this.props.handleCardOpen(this.props.opportunity)
    this.setState({ cardOpen: true })
  }

  handleCardClose(e){
    this.setState({ cardOpen: false })
  }

  handleDeleteOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleDeleteClose(deleteBool){
    return () => {
      debugger
      if (deleteBool){
        this.props.handleDelete(this.props.opportunity.id);
      }
      this.setState({ deleteOpen: false });
    }
  };

  handleEdit(id){
    return e => {
      this.props.history.push(`/editopportunity/${id}`)
    }
  }

  getCardIcon(status){
    const { classes } = this.props;

    switch(status) {
      case 'Approved':
        return <CheckCircleIcon className={classes.icon} />;
      case 'Pending':
        return <WarningSharpIcon className={classes.icon} />;
      case 'Rejected':
        return <BlockSharpIcon className={classes.icon} />;
      default:
        return '';
    }
  }

  render(){
    const { classes, opportunity, editable, demo }= this.props;
    const { cardOpen } = this.state;
    let { title, description, industries, opportunityNeed, geography,
      value, status } = opportunity;

    if (!_.isEmpty(opportunity)){

      let additionalInfo = editable ? (
        <div className={classes.cardSubWrapper}>
          <div>
            <Typography variant="h6" gutterBottom align='left'
              color="secondary" className={classes.cardSubHeader}>
              Status
            </Typography>
            <Typography variant="subtitle1" gutterBottom align='left'
              color="default" className={classes.cardSubContentStatus}>
              {status}
            </Typography>
          </div>

          <div>
            <Typography variant="h6" gutterBottom align='left'
              color="secondary" className={classes.cardSubHeader}>
              Opportunity Need
            </Typography>
            <Typography variant="subtitle1" gutterBottom align='left'
              color="default" className={classes.cardSubContentStatus}>
              {opportunityNeed}
            </Typography>
          </div>
        </div>
      ): (<div></div>)

      let editOptions = editable ? (
        <div className={classes.buttonWrapper}>
          <Button variant="contained" className={classes.button}
            onClick={this.handleEdit(opportunity.id)}>
            Edit
          </Button>
          <Button variant="contained" className={classes.button}
            onClick={this.handleDeleteOpen}>
            Delete
          </Button>
        </div>
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
            <Button autoFocus color='error'
              onClick={this.handleDeleteClose(true)} variant='contained'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : (<div></div>)

      let cardIcon = this.getCardIcon(status);

      return (
      <div>
        <Badge
          badgeContent={cardIcon}
          style={{ width: '100%'}}
          >
          <Card className={classes.card}>
            <CardActionArea onClick={this.handleCardOpen}>
              <CardMedia
                className={classes.cover}
                image={PickImage(industries[0])}
                title="OpportunityImage"
                />
              <CardContent className={classes.content}>
                <div className={classes.cardHeaderWrapper}>
                  <Typography variant="h5" align='left'
                    color="default" className={classes.title} >
                    {title}
                  </Typography>
                </div>
                <div className={classes.cardDescriptionWrapper}>
                  <Typography variant="body2" align='left'
                    color="default" className={classes.description}
                    >
                    {description}
                  </Typography>
                </div>

                <div className={classes.cardSubWrapper}>
                  <div style={{ width:'31%'}} >
                    <Typography variant="h6" gutterBottom align='left'
                      className={classes.cardSubHeader} noWrap>
                      Geography
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align='left'
                      color="default" className={classes.cardSubContent}>
                      {geography.join(", ")}
                    </Typography>
                  </div>

                  <div style={{ width:'31%'}} >
                    <Typography variant="h6" gutterBottom align='left'
                      className={classes.cardSubHeader}
                      noWrap>
                      Industry
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align='left'
                      color="default" className={classes.cardSubContent}
                      >
                      {industries.join(", ")}
                    </Typography>
                  </div>

                  <div style={{ width:'31%'}} >
                    <Typography variant="h6" gutterBottom align='left'
                      className={classes.cardSubHeader}
                      noWrap>
                      Value
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align='left'
                      color="default" className={classes.cardSubContent}
                      >
                      {value}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
            {editable && editOptions}
            {editable && deleteDialog}
          </Card>
        </Badge>
        <CardModal open={cardOpen}
          handleClose={this.handleCardClose}
          opportunity={opportunity}
          demo={demo}/>
      </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default withRouter(withStyles(styles)(OpportunityCard));
