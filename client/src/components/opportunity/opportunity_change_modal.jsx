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

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

// import castlePic from '../../static/castle.jpg';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions';
import {createOpportunity, updateOpportunity} from '../../actions/opportunity_actions';
import { clearConnectedOpportunityErrors } from '../../actions/error_actions';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import InfoIcon from '@material-ui/icons/InfoSharp';
import SendIcon from '@material-ui/icons/SendSharp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import Checkbox from '@material-ui/core/Checkbox';

import { needsChoices } from '../../util/choices';
import { industryChoices } from '../../util/choices';
import { geographyChoices } from '../../util/choices';
import { valueChoices } from '../../util/choices';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
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
    height: 33, minWidth: 400,
    padding: "0px 10px"
  },
  createFilterButton:{
    textTransform: 'none',
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    marginRight: 10,
  },
  postButton:{
    textTransform: 'none',
  },
  infoButton:{
    marginLeft: 3
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
  fieldSelectIndustry:{ width: 100 }
});

const DEFAULTSTATE = {
  // activeStep: 0,
  // modalOpen: false,
  // pictureUrl: null,
  sendingProgress: false,
  oppType: 'post',
  infoAnchorEl: null,
  needsChoices,
  industryChoices,
  geographyChoices,
  valueChoices
}

class OpportunityChangeModal extends React.Component {
  constructor(props){
    super(props)
    this.state = Object.assign({}, DEFAULTSTATE, this.props.opportunity);

    this.toggleOpp = this.toggleOpp.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.open !== this.props.open){
      this.setState(Object.assign({}, DEFAULTSTATE, this.props.opportunity))
    }
  }

  handleSubmit(){
    this.setState({ sendingProgress: true },
    () => {
      // let fields = ['geography', 'industries', 'value', 'title',
      //   'description','networks', 'opportunityNeed' , 'picture' ];
      // const formData = new FormData();
      //
      // for (let i = 0; i < fields.length; i++){
      //   if(this.state[fields[i]]){
      //     formData.append(`opportunity[${fields[i]}]`, this.state[fields[i]]);
      //   }
      // }
      //
      // if(this.props.type === 'create'){
      //   this.props.createOpportunity(formData)
      //   .then(() => {
      //     this.setState({ modalOpen: true, sendingProgress: false });
      //     this.props.handleClose();
      //   })
      // } else {
      //   formData.append(`opportunity[id]`, this.props.opportunity.id);
      //   this.props.updateOpportunity(formData)
      //   .then(() => {
      //     this.setState({ modalOpen: true, sendingProgress: false });
      //     this.props.handleClose();
      //   })
      // }
      this.props.handleClose();
    });
  };

  handleChange(field){
    return e => {
      e.preventDefault();
      let clickedOption = e.target.value;
      this.setState({ [field]: clickedOption})
    }
  }

  handleInfoClick = event => {
    this.setState({ infoAnchorEl: event.currentTarget });
  };

  handleInfoClose = () => {
    this.setState({ infoAnchorEl: null });
  };

  toggleOpp(e){
    e.preventDefault();
    const { oppType } = this.state;
    this.setState({ oppType: (oppType === 'post' ? 'card' : 'post') })
  }

  render () {
    const { open, classes,
      availNetworks, flow, currentUser } = this.props;
    const { oppType, infoAnchorEl, needsChoices,
      industryChoices, geographyChoices, valueChoices } = this.state;
    const infoOpen = Boolean(infoAnchorEl);

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.props.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}
        style={{ top: '10%' }}>

        <Grid container justify='space-between' alignItems='center'
          className={classes.closeBar}>
          {`Create Opportunity`}
          <CloseIcon
            onClick={this.props.handleClose}
            style={{ cursor: 'pointer'}}/>
        </Grid>

        <Grid container justify='center' alignItems='center'
          style={{ padding: "0px 20px"}}>
          <Grid container justify='center' alignItems='center'
            style={{ height: 95 }}>
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

            <Grid container style={{ flexGrow: 1, width: 'auto'}}
              alignItems='center'>
              <TextField
                id="outlined-multiline-static"
                multiline
                rowsMax="3"
                fullWidth
                placeholder={"What's your most pressing business need or opportunity"}
                value={this.state.title}
                onChange={this.handleChange('title')}
                className={classes.descriptionTextField}
                />
            </Grid>
          </Grid>

          {oppType === 'card' &&
            <Grid container justify='flex-start' alignItems='flex-start'
              className={ classes.descriptionField}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows="4"
                rowsMax="8"
                fullWidth
                placeholder={"Tell us a bit more about your opportunity..."}
                value={this.state.description}
                onChange={this.handleChange('description')}
                className={classes.descriptionTextField}
                />
            </Grid>}

          {oppType === 'card' &&
            <Grid container justify='space-around' alignItems='center'>

              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Business Need</InputLabel>
                <Select
                  value={this.state.opportunityNeed}
                  onChange={this.handleChange('opportunityNeed')}
                  name="opportunityNeed"
                  inputProps={{
                    id: 'opportunityNeed-required',
                    name: 'opportunityNeed'
                  }}
                  className={classes.fieldSelectNeed}
                >
                  {needsChoices.map(choice => (
                    <MenuItem value={choice} key={choice}
                      style={{ textTransform: 'capitalize'}}>
                      {choice}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl required className={classes.formControl}>
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
                <InputLabel htmlFor="age-required">Geographical Focus</InputLabel>
                <Select
                  multiple
                  value={this.state.geography}
                  onChange={this.handleChange('geography')}
                  name="geography"
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => selected.join(', ')}
                  className={classes.fieldSelectNeed}
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

              <FormControl required className={classes.formControl}>
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
            style={{ paddingTop: 17, margin: "0px 10px"}}>
            <Grid item>
              <Button className={classes.createFilterButton}>
                Image
              </Button>
              <Button className={classes.createFilterButton}>
                Privacy
              </Button>
              <Button className={classes.createFilterButton}>
                {`Share with: Connections`}
              </Button>
            </Grid>

            <Grid item xs={3} container justify='center' alignItems='center'>
              <Button className={classes.postButton}
                color='primary' variant='contained'
                onClick={this.handleSubmit}>
                Post
              </Button>
            </Grid>
          </Grid>

          <Grid container justify='flex-start' alignItems='center'
            style={{ paddingTop: 41}}>
            <Button onClick={this.toggleOpp}>
              <Typography align='Left' color="textSecondary"
                variant='subtitle1'>
                {oppType === 'post' ? `OPPORTUNITY CARD` : `OPPORTUNITY POST`}
              </Typography>
            </Button>

            <IconButton className={classes.infoButton}
              aria-owns={open ? 'simple-popper' : undefined}
              aria-haspopup="true"
              onClick={this.handleInfoClick}>
              <InfoIcon/>
            </IconButton>

            <Popover
              id="simple-popper"
              open={infoOpen}
              anchorEl={infoAnchorEl}
              onClose={this.handleInfoClose}
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
              {oppType === 'post' ?
                `An opportunity card allows you to add more details and tags` :
                `An opportunity post allows you to share a quick business need or opportunity`}
            </Typography>
            </Popover>
          </Grid>
        </Grid>

      </Dialog>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityChangeModal)));

// <Badge
//   badgeContent={<CloseIcon onClick={this.props.handleClose}/>}
//   classes={{ badge: classes.badge }}
//   style={{ width: '100%'}}
//   >
//   Hello
// </Badge>
