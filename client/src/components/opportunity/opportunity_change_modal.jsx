import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Menu from '@material-ui/core/Menu';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import withWidth from '@material-ui/core/withWidth';

// import castlePic from '../../static/castle.jpg';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions';
import {createOpportunity, updateOpportunity} from '../../actions/opportunity_actions';
import { clearConnectedOpportunityErrors } from '../../actions/error_actions';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import InfoIcon from '@material-ui/icons/InfoSharp';
import SendIcon from '@material-ui/icons/SendSharp';
import PersonIcon from '@material-ui/icons/PersonSharp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import Checkbox from '@material-ui/core/Checkbox';

import SvgIcon from '@material-ui/core/SvgIcon';
import PictureIconSVG from '../../static/opp_feed_icons/picture.svg'
import ShareIconSVG from '../../static/opp_feed_icons/share.svg'
import PrivacyIconSVG from '../../static/opp_feed_icons/privacy.svg'

import ImageCropModal from '../image_upload_modal';

import { needsChoices } from '../../util/choices';
import { industryChoices } from '../../util/choices';
import { geographyChoices } from '../../util/choices';
import { valueChoices } from '../../util/choices';

import SubmitModal from '../post_opportunity/submit_modal';
import merge from 'lodash/merge';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunityErrors: state.errors.opportunities
});

const mapDispatchToProps = dispatch => ({
  createOpportunity: (opp) => dispatch(createOpportunity(opp)),
  updateOpportunity: (opp) => dispatch(updateOpportunity(opp)),
});

const styles = theme => ({
  paper: {
    // position: 'absolute',
    margin: 15,
    // height: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  cardModalWrapper:{
    padding: 0,
    // minWidth: 500,
  },
  cover: {
    height: 150,
    width: '100%',
    objectFit: 'cover'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 440,
    overflow: 'scroll'
  },
  closeBar:{
    backgroundColor:`${fade(theme.palette.common.black,0.05)}`,
    height: 33,
    padding: "0px 10px",
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    }
  },
  avatar:{
    width: 51,
    height: 51,
    marginRight: 12
  },
  createFilterButton:{
    textTransform: 'none',
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    margin: "5px 10px 5px 0px",
    borderRadius: 10,
  },
  createFilterSelectedButton:{
    textTransform: 'none',
    margin: "5px 10px 5px 0px",
    borderRadius: 10,
  },
  postButton:{
    textTransform: 'none',
  },
  infoButton:{
    marginLeft: 0,
    position: 'absolute',
    top: 0, right: '-13%'
  },
  infoIconButton:{
    padding: 0
  },
  popoverPaper:{
    padding: 3,
    maxWidth: 230
  },
  descriptionField:{
    // height: 122,
    // paddingTop: 28,
    // paddingTop: 20,
    // paddingBottom: 20,
    // borderBottom: `1px solid ${theme.palette.grey1}`
  },
  descriptionTextField: {
    width: '100%'
  },
  fieldButton:{
    textTransform: 'capitalize'
  },
  fieldSelectNeed:{ width: 150 },
  fieldSelectIndustry:{ width: 130 },
  modalWrapper:{
    padding: 0,
    // minWidth: 500,
  },
  modalPaper:{
    margin: 0,
    position: 'fixed',
    top: 64,
    [theme.breakpoints.up('sm')]: {
      top: 84,
    }
  },
  postErrorText:{
    fontSize: 10,
    color: '#E88262',
    width: 150
  },
  filterButtonIcon:{
    width: 14,
    marginRight: 3
  },
  textListSecondary:{
    fontSize: 10
  }
});

const DEFAULTSTATE = {
  // activeStep: 0,
  // modalOpen: false,
  // pictureUrl: null,
  sendingProgress: false,
  infoAnchorEl: null,
  privacyAnchorEl: null,
  shareAnchorEl: null,
  needsChoices,
  industryChoices,
  geographyChoices,
  valueChoices,
  mobileImageCropPending: false,
  imageModalOpen: false,
  share: []
}

class OpportunityChangeModal extends React.Component {
  constructor(props){
    super(props)
    this.state = merge({}, DEFAULTSTATE, this.props.opportunity);

    this.toggleOpp = this.toggleOpp.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handlePrivacyClose = this.handlePrivacyClose.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleSubmitModalClose = this.handleSubmitModalClose.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.opportunity !== this.props.opportunity){
      this.setState(merge({}, DEFAULTSTATE, nextProps.opportunity))
    }
    return true;
  }

  handleSubmit(){
    this.setState({ sendingProgress: true },
    () => {
      // Base Fields
      let fields = ['geography', 'industries', 'value', 'title',
        'description', 'opportunityNeed', 'picture', 'anonymous', 'viewType'];
      const { share }= this.state;
      const formData = new FormData();

      for (let i = 0; i < fields.length; i++){
        if(this.state[fields[i]] || fields[i] === 'anonymous'){
          formData.append(`opportunity[${fields[i]}]`, this.state[fields[i]]);
        }
      }

      // Add Sharing settings
      let networks = [];
      let connections = [];
      let circles = [];
      for(let i = 0; i < share.length; i++){
        let option = share[i];
        if(option.type === 'network'){ networks.push(option.id)}
      }

      formData.append(`opportunity[networks]`, networks);
      formData.append(`opportunity[connections]`, connections);
      formData.append(`opportunity[circles]`, circles);

      if(this.props.type === 'create'){
        this.props.createOpportunity(formData)
        .then(() => {
          if(this.props.opportunityErrors.length !== 0){
            this.setState({
              sendingProgress: false,
              submitModalOpen: true,
              share: []
            });
          } else {
            this.setState({
              sendingProgress: false
            });
            this.handleClose();
          }
          // this.handleClose();
        })
      } else {
        formData.append(`opportunity[id]`, this.props.opportunity.id);
        this.props.updateOpportunity(formData)
        .then(() => {
          if(this.props.opportunityErrors.length !== 0){
            this.setState({
              sendingProgress: false,
              submitModalOpen: true,
              share: []
            });
          } else {
            this.setState({
              sendingProgress: false
            });
            this.handleClose();
          }
          // this.clearFields();
        })
      }
    });
  };

  handleClose(){
    // e.preventDefault();
    this.clearFields();
    this.props.handleClose();
    this.setState({ share: [] });
  }

  handleSubmitModalClose(closeChangeModal){
    return e => {
      this.setState({ submitModalOpen: false },
      () =>  {
        if (closeChangeModal){
          this.clearFields();
          this.handleClose();
        }
      })
    }
  }

  clearFields(){
    this.setState(merge({}, DEFAULTSTATE, this.props.opportunity))
  }

  handleChange(field){
    return e => {
      e.preventDefault();
      let option = e.target.value;
      if ((['industries', 'geography'].includes(field) &&
        option.length <= 3) ||
        (field === 'title' && option.length <= 80 ) ||
        !['industries', 'geography','title'].includes(field)) {
          this.setState({ [field]: option})
      }
    }
  }

  handleMenuClick(anchor){
    return e => {
      e.stopPropagation();
      this.setState({ [anchor]: e.currentTarget });
    }
  };

  handleMenuClose(anchor){
    return e => {
      e.stopPropagation();
      this.setState({ [anchor]: null });
    }
  };

  handlePrivacyClose(bool){
    return e => {
      e.preventDefault();
      this.setState({ anonymous: bool})
    }
  }

  handleShareClose(choice){
    return e => {
      e.preventDefault();
      let { share } = this.state;
      let indexOfChoice = share.indexOf(choice)
      if (indexOfChoice > -1){
        share.splice(indexOfChoice, 1)
      } else {
        share.push(choice);
      }
      this.setState({ share })
    }
  }

  toggleOpp(e){
    e.preventDefault();
    const { viewType } = this.state;
    this.setState({ viewType: (viewType === 'post' ? 'card' : 'post') })
  }

  getSecondaryText(choice){
    switch(choice){
      case 'Find':
        return `properties, companies, or products`;
      case 'Sell':
        return `properties, companies, or products`;
      case 'Discover':
        return `new team members or join a team`;
      default:
        return ``;
    }
  }

  handleFile(e){
    // debugger
    let file = e.currentTarget.files[0];
    if (this.props.width !== 'xs'){
      this.handleFileHelper(file, true, false);
    } else {
      this.handleFileHelper(file, false, true);
    }
  }

  handleCloseImageModal(newFile){
    if(newFile && this.props.width !== 'xs'){
      // normal screens
      this.handleFileHelper(newFile, false, false)
    } else if (newFile && this.props.width === 'xs'){
      //mobile screens
      this.handleFileHelper(newFile, false, false)
    } else {
      this.setState({ imageModalOpen: false})
    }
  }

  handleFileHelper(file, bool, mobilePendingBool){
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        picture: file,
        pictureUrl: fileReader.result,
        imageModalOpen: bool,
        mobileImageCropPending: mobilePendingBool
      })
    }

    if(file){
      fileReader.readAsDataURL(file)
    }
  }

  handleRemoveFile(e){
    if (e){
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({
      picture: null,
      pictureUrl: null,
    })
  }

  checkErrors(){
    const { title, description, industries, opportunityNeed, geography,
      value, share, viewType } = this.state;

    if (viewType === 'card'){
      let opp = { title, description, industries, opportunityNeed, value,
        geography, share };
      let keys = Object.keys(opp);
      let errors = [];

      for (let i = 0; i < keys.length; i++){
        console.log(keys[i]);
        if(opp[keys[i]] === null ||
          opp[keys[i]] === '' ||
          opp[keys[i]].length === 0){
          let formatted = this.capitalize(keys[i].replace(/([A-Z])/g, ' $1'));
          errors.push(`${formatted} is blank`);
        }
      }
      return errors.length > 0;
    } else {
      return share.length === 0 || title === ''
    }
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render () {
    const { open, classes, type,
      availNetworks, flow, currentUser } = this.props;

    const { viewType, infoAnchorEl, needsChoices,
      industryChoices, geographyChoices, valueChoices,
      privacyAnchorEl, shareAnchorEl, share,
      mobileImageCropPending, imageModalOpen, picture,
      pictureUrl, title, submitModalOpen, anonymous,
      sendingProgress } = this.state;

    const infoOpen = Boolean(infoAnchorEl);
    const shareSelected = share.map(choice => choice.title).join(', ');

    const otherConnectionOptions = [
      {title: 'Connections', type: 'connection'},
      {title: 'Network Circles', type: 'circle'},
      {title: 'Custom', type: 'other'}]

    const isError = this.checkErrors();

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>

        <Grid container justify='space-between' alignItems='center'
          className={classes.closeBar}>
          {type === 'create' ? `Create Opportunity` : `Update Opportunity`}
          <CloseIcon
            onClick={this.handleClose}
            style={{ cursor: 'pointer'}}/>
        </Grid>

        <Grid container justify='center' alignItems='center'
          style={{ padding: "0px 20px"}}>
          <Grid container justify='center' alignItems='center'
            style={{ height: 95 }}>

            {currentUser.profilePicUrl && !anonymous ? (
              <Avatar alt="profile-pic"
                src={currentUser.profilePicUrl}
                className={classes.avatar} />
            ) : (
              <AccountCircle className={classes.avatar}/>
            )}

            <Grid container style={{ flexGrow: 1, width: 'auto'}}
              alignItems='center'>
              <TextField
                id="outlined-multiline-static"
                multiline
                rowsMax="3"
                fullWidth
                placeholder={
                  viewType === 'card' ? "Opportunity title" :
                  `What's your most pressing business need or opportunity`
                }
                value={this.state.title}
                onChange={this.handleChange('title')}
                className={classes.descriptionTextField}
                />
            </Grid>
          </Grid>

          {viewType === 'card' &&
            <Grid container justify='flex-start' alignItems='flex-start'
              className={ classes.descriptionField}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows="4"
                rowsMax="8"
                fullWidth
                placeholder={"Describe your most pressing business need or opportunity..."}
                value={this.state.description}
                onChange={this.handleChange('description')}
                className={classes.descriptionTextField}
                />
            </Grid>}

          {viewType === 'card' &&
            <Grid container justify='space-between' alignItems='center'>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-required">Business Need</InputLabel>
                <Select
                  value={this.state.opportunityNeed}
                  onChange={this.handleChange('opportunityNeed')}
                  name="opportunityNeed"
                  inputProps={{
                    id: 'opportunityNeed-required',
                    name: 'opportunityNeed'
                  }}
                  renderValue={selected => selected}
                  className={classes.fieldSelectNeed}
                >
                  {needsChoices.map(choice => (
                    <MenuItem value={choice} key={choice}
                      style={{ textTransform: 'capitalize'}}>
                      <ListItemText
                        primary={choice}
                        secondary={this.getSecondaryText(choice)}
                        classes={{
                          primary: classes.textListPrimary,
                          secondary: classes.textListSecondary
                        }}/>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-required">Industry</InputLabel>
                <Select
                  multiple
                  value={this.state.industries}
                  onChange={this.handleChange('industries')}
                  name="industries"
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => selected.join(', ')}
                  className={classes.fieldSelectIndustry}
                >
                  {industryChoices.map(choice => (
                    <MenuItem value={choice} key={choice}
                      style={{ textTransform: 'capitalize'}}>
                      <Checkbox checked={this.state.industries.indexOf(choice) > -1} />
                      <ListItemText primary={choice} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-required">Geography</InputLabel>
                <Select
                  multiple
                  value={this.state.geography}
                  onChange={this.handleChange('geography')}
                  name="geography"
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => selected.join(', ')}
                  className={classes.fieldSelectIndustry}
                >
                  {geographyChoices.map(choice => (
                    <MenuItem value={choice} key={choice}
                      style={{ textTransform: 'capitalize'}}>
                      <Checkbox checked={this.state.geography.indexOf(choice) > -1} />
                      <ListItemText primary={choice} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-required">Deal Value</InputLabel>
                <Select
                  value={this.state.value}
                  onChange={this.handleChange('value')}
                  name="value"
                  inputProps={{
                    id: 'value-required',
                    name: 'value'
                  }}
                  className={classes.fieldSelectIndustry}
                >
                  {valueChoices.map(choice => (
                    <MenuItem value={choice}
                      style={{ textTransform: 'capitalize'}}>
                      {choice}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>}

          <Grid container justify='space-between' alignItems='center'
            style={{ paddingTop: 17, margin: 0}}>
            <Grid item xs={9}>
              <input
                accept="image/*"
                style={{ display: 'none'}}
                id="contained-button-file"
                type="file"
                onChange={this.handleFile.bind(this)}
                onClick={(event)=> {
                  event.target.value = null
                }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  color='primary'
                  variant={pictureUrl ? 'contained' : undefined }
                  className={ pictureUrl ?
                    classes.createFilterSelectedButton :
                    classes.createFilterButton}
                  component="span">
                  { !pictureUrl && <img src={PictureIconSVG} alt='pic-icon'
                    className={classes.filterButtonIcon}/>}
                  Image
                  { pictureUrl &&
                    <IconButton
                      onClick={this.handleRemoveFile.bind(this)}
                      classes={{ root: classes.infoIconButton}}>
                      <CloseIcon style={{ color: 'white', fontSize: 20}}/>
                    </IconButton>
                  }
                </Button>
              </label>
              <Button
                className={classes.createFilterButton }
                style={{ padding: "6px 8px"}}
                onClick={this.handleMenuClick('privacyAnchorEl')}>
                {this.state.anonymous ?
                  <img src={PrivacyIconSVG} alt='privacy-icon'
                  className={classes.filterButtonIcon}/> :
                  <PersonIcon className={classes.filterButtonIcon}/>
                }
                Privacy
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={privacyAnchorEl}
                open={Boolean(privacyAnchorEl)}
                onClose={this.handleMenuClose('privacyAnchorEl')}
              >
                <MenuItem onClick={this.handlePrivacyClose(false)}>
                  <Checkbox checked={!this.state.anonymous} />
                  <ListItemText primary={`Post with Name & Picture`} />
                </MenuItem>
                <MenuItem onClick={this.handlePrivacyClose(true)}>
                  <Checkbox checked={this.state.anonymous} />
                  <ListItemText primary={`Post anonymously`} />
                </MenuItem>
              </Menu>

              <Button
                className={classes.createFilterButton }
                onClick={this.handleMenuClick('shareAnchorEl')}>
                <img src={ShareIconSVG} alt='share-icon'
                  className={classes.filterButtonIcon}/>
                {`Share with: ${shareSelected}`}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={shareAnchorEl}
                open={Boolean(shareAnchorEl)}
                onClose={this.handleMenuClose('shareAnchorEl')}
              >
                {Object.values(availNetworks).map(network => (
                  <MenuItem
                    value={network}
                    key={network.id}
                    style={{ textTransform: 'capitalize'}}
                    onClick={this.handleShareClose(network)}>
                    <Checkbox checked={this.state.share.indexOf(network) > -1} />
                    <ListItemText primary={network.title} />
                  </MenuItem>
                ))}

                {currentUser.isAdmin && otherConnectionOptions.map(choice => (
                  <MenuItem value={choice} key={choice.title}
                    style={{ textTransform: 'capitalize'}}
                    onClick={this.handleShareClose(choice)}
                    disabled>
                    <Checkbox checked={this.state.share.indexOf(choice) > -1} />
                    <ListItemText primary={choice.title} />
                  </MenuItem>
                ))}
              </Menu>
            </Grid>

            <Grid item xs={3} container justify='center' alignItems='center'>
              <Button className={classes.postButton}
                color='primary' variant='contained'
                onClick={this.handleSubmit}
                disabled={
                  (viewType === 'card' && isError) ||
                  (viewType === 'post' && isError) ||
                  sendingProgress}>
                Post
              </Button>
            </Grid>
          </Grid>

          <Grid container justify='space-between' alignItems='center'
            style={{ paddingTop: 41}}>
            <Button onClick={this.toggleOpp}
              style={{ position: 'relative'}}>
              <Typography align='Left' color="textSecondary"
                variant='subtitle1'>
                {viewType === 'post' ? `OPPORTUNITY CARD` : `OPPORTUNITY POST`}
              </Typography>

              <IconButton className={classes.infoButton}
                aria-owns={open ? 'simple-popper' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuClick('infoAnchorEl')}
                classes={{ root: classes.infoIconButton}}>
                <InfoIcon/>
              </IconButton>

              <Popover
                id="simple-popper"
                open={infoOpen}
                anchorEl={infoAnchorEl}
                onClose={this.handleMenuClose('infoAnchorEl')}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                classes={{ paper: classes.popoverPaper}}
                >
                <Typography align='Left' color="textSecondary"
                  variant='body2' style={{ fontSize: 10 }}>
                  {viewType === 'post' ?
                    `An opportunity card allows you to add more details and tags` :
                    `An opportunity post allows you to share a quick business need or opportunity`}
                  </Typography>
                </Popover>
            </Button>

            {viewType === 'card' && isError &&
              <Typography align='center' color="textSecondary"
                variant='body2'
                className={classes.postErrorText}>
                {viewType === 'card' ?
                  `Fill in all fields before submitting` :
                  `Fill in title and share settings before submitting`}
              </Typography>
            }
          </Grid>
        </Grid>

        <ImageCropModal
          handleClose={this.handleCloseImageModal.bind(this)}
          open={imageModalOpen}
          handleDelete={this.handleRemoveFile.bind(this)}
          fileUrl={pictureUrl}
          file={picture}
          ratio={2.3/1}
          innerRef={(ref) => this.cropperModal = ref} />

        <SubmitModal
          open={submitModalOpen}
          modalType={type}
          handleClose={this.handleSubmitModalClose}
          clearFields={this.clearFields}/>
      </Dialog>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(OpportunityChangeModal))));

// <Badge
//   badgeContent={<CloseIcon onClick={this.props.handleClose}/>}
//   classes={{ badge: classes.badge }}
//   style={{ width: '100%'}}
//   >
//   Hello
// </Badge>
