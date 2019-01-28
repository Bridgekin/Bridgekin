import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import GeoField from './opportunity_geo';
import NeedsField from './opportunity_needs';
import IndustryField from './opportunity_industry';
import ValueField from './opportunity_value';
import DescriptionField from './opportunity_description';
import SubmitField from './opportunity_submit';
import SubmitModal from './submit_modal';
import MobileStepper from '@material-ui/core/MobileStepper';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import {createOpportunity, updateOpportunity} from '../../actions/opportunity_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  createOpportunity: (opp) => dispatch(createOpportunity(opp)),
  updateOpportunity: (opp) => dispatch(updateOpportunity(opp)),
});

const styles = {
  root: {
    flexGrow: 1,
    borderBottom: '1px solid #d3d3d3'
  },
  gridDesktop:{
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    flexGrow: 1,
    // backgroundColor: 'RGBA(196,196,196,0.1)',
    backgroundColor: theme.palette.backgroundGrey,
    borderBottom: '1px solid #d3d3d3',
    height: 100,
    position:'fixed',
    top: 64,
    zIndex: 10
  },
  gridMobile:{
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    flexGrow: 1,
    // backgroundColor: 'RGBA(196,196,196,0.1)',
    backgroundColor: theme.palette.backgroundGrey,
    borderBottom: '1px solid #d3d3d3',
    height: 100,
    position:'fixed',
    top: 64,
    zIndex: 10
  },
  // accountNavSection:{
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  stepperRoot:{
    flexGrow: 1
  },
  paper:{
    background: 'RGBA(196,196,196,0.1)'
  },
  stepper:{
    background: 'none'
  },
  stepperRootMain:{
    flexGrow: 1,
    // marginTop: 50,
    marginBottom: 50,
    position: 'relative',
    top:164
  },
  step: {
    "& $completed": {
      color: theme.palette.text.primary
    },
    "& $active": {
      color: theme.palette.grey2
    },
    "& $disabled": {
      color: "red"
    }
  },
  active: {}, //needed so that the &$active tag works
  completed: {},
  alternativeLabel: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  mainWrapper:{
    // border: '1px solid red'
  },
  flowNav:{
    // display: 'flex',
    // justifyContent:'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  flowButton: {
    // margin: '0px 20px 0px 20px',
    // fontSize: 20,
    // fontWeight: 500,
    width: 120
  },
  stepperDesktop: {
    background: 'none',
    padding: 15,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  stepperMobile: {
    flexGrow: 1,
    background: 'none',
    paddingLeft: 0,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  stepperLabel:{
    fontSize: 12
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '20%',
    left: '50%',
    marginLeft: -12,
  },
};

const DEFAULTSTATE = {
  activeStep: 0,
  modalOpen: false,
  pictureUrl: null,
  sendingProgress: false
}

class OpportunityChange extends React.Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, DEFAULTSTATE, this.props.opportunity);

    this.handleChange = this.handleChange.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.activeStep !== this.state.activeStep){
      window.scrollTo(0, 0);
    }
  }

  getSteps() {
    return ['Need', 'Industry', 'Geography', 'Value', 'Description', 'Post'];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <NeedsField
          handleChange={this.handleChange('opportunityNeed')}
          opportunityNeed={this.state.opportunityNeed}/>;
      case 1:
        return <IndustryField
          handleChange={this.handleChange('industries')}
          industries={this.state.industries}/>;
      case 2:
        return <GeoField
          handleChange={this.handleChange('geography')}
          geography={this.state.geography}/>;
      case 3:
        return <ValueField
          handleChange={this.handleChange('value')}
          value={this.state.value}/>;
      case 4:
        return <DescriptionField
          handleChange={this.handleChange}
          title={this.state.title}
          description={this.state.description}
          networks={this.state.networks}
          availNetworks={this.props.availNetworks}
          pictureUrl={this.state.pictureUrl}
          handleFile={this.handleFile.bind(this)}
          handleRemoveFile={this.handleRemoveFile.bind(this)}/>;
      case 5:
        let errors = this.checkErrors();
        debugger
        return <SubmitField
          title={this.state.title}
          description={this.state.description}
          networks={this.state.networks}
          value={this.state.value}
          geography={this.state.geography}
          industries={this.state.industries}
          availNetworks={this.props.availNetworks}
          opportunityNeed={this.state.opportunityNeed}
          errors={errors}
          status={this.state.status}
          pictureUrl={this.state.pictureUrl}/>;
      default:
        return 'Unknown step';
    }
  }

  handleFile(picture, pictureUrl){
    this.setState({ picture , pictureUrl})
    // let fileReader = new FileReader();
    //
    // fileReader.onloadend = () => {
    //   debugger
    //   this.setState({
    //     picture,
    //     previewUrl: fileReader.result,
    //   })
    // }
    //
    // if(picture){
    //   fileReader.readAsDataURL(picture)
    // }
  }

  handleRemoveFile(){
    this.setState({ picture: 'delete', pictureUrl: null})
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleSubmit(){
    this.setState({ sendingProgress: true },
    () => {
      let fields = ['geography', 'industries', 'value', 'title',
        'description','networks', 'opportunityNeed' , 'picture' ];

      const formData = new FormData();

      for (let i = 0; i < fields.length; i++){
        if(this.state[fields[i]]){
          formData.append(`opportunity[${fields[i]}]`, this.state[fields[i]]);
        }
      }
      // formData.append(`opportunity[geography]`, this.state.geography.join(','));
      // formData.append(`opportunity[industries]`, this.state.industries.join(','));

      if(this.props.type === 'create'){
        this.props.createOpportunity(formData)
        .then(() => this.setState({ modalOpen: true, sendingProgress: false }) )
      } else {
        // opportunity.id = this.props.opportunity.id
        formData.append(`opportunity[id]`, this.props.opportunity.id);
        this.props.updateOpportunity(formData)
        .then(() => this.setState({ modalOpen: true, sendingProgress: false }) )
      }
    });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    const reset = Object.assign({}, DEFAULTSTATE, this.props.opportunity)
    this.setState(reset);
  };

  handleChange(field) {
    return (value) => {
      debugger
      this.setState({ [field]: value });
    }
  }

  capitalize(string){
    return string[0].toUpperCase() + string.slice(1)
  }

  checkErrors(){
    const { title, description, industries, opportunityNeed, geography,
      value, networks } = this.state;
    let opp = { title, description, industries, opportunityNeed, value,
      networks, geography};
    let keys = Object.keys(opp);
    let errors = [];

    for (let i = 0; i < keys.length; i++){
      if(opp[keys[i]] === undefined || opp[keys[i]].length === 0){
        let formatted = this.capitalize(keys[i].replace(/([A-Z])/g, ' $1'));
        errors.push(`${formatted} is blank`);
      }
    }
    return errors;
  }

  render (){
    const { classes, type } = this.props;
    const steps = this.getSteps();
    const { activeStep, modalOpen, sendingProgress } = this.state;

    console.log(this.state)

    let errors = this.checkErrors();

    let flowNav = (
      <Grid container justify='space-between' className={classes.flowNav}>
        <Grid item xs={4} sm={3} md={2} container justify='center'>
          <Button
            disabled={activeStep === 0}
            variant="contained"
            color="secondary"
            onClick={this.handleBack}
            className={classes.flowButton}
            >
            Back
          </Button>
        </Grid>

        <Grid item xs={4} sm={3} md={2} container justify='center'>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              sendingProgress ||
              ((errors.length > 0) &&
              (activeStep === steps.length - 1))}
            onClick={ activeStep === steps.length - 1 ?
              this.handleSubmit : this.handleNext}
            className={classes.flowButton}
          >
            {activeStep === steps.length - 1 ? (
              type === 'create' ? 'Submit' : 'Update'
            ) : 'Next'}
          </Button>
          {sendingProgress && <CircularProgress size={24}
            className={classes.buttonProgress} />}
        </Grid>
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.gridDesktop}
          justify='space-around' alignItems='center'>

          <Grid item xs={10} sm={6} md={2}
            container justify='center' alignItems='center'>
            <Typography variant="h5" gutterBottom>
              <strong>
                {type === 'create' ? 'Post Opportunity' : 'Edit Opportunity'}
              </strong>
            </Typography>
          </Grid>

          <Grid item xs={6} md={8}>
            <Stepper activeStep={activeStep} alternativeLabel
              classes={{ root: classes.stepperRoot }}
              className={classes.stepperDesktop}>
              {steps.map((label, index) => (
                <Step key={label}
                  classes={{
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active
                  }}>
                  <StepLabel
                    StepIconProps={{
                      classes: {
                        root: classes.step,
                        completed: classes.completed,
                        active: classes.active,
                        disabled: classes.disabled
                      }
                    }}
                    label={{ color: '#000000' }}
                    classes={{ root: classes.stepperLabel }}
                    >
                    {label}
                  </StepLabel>
                </Step>
                )
              )}
            </Stepper>
          </Grid>
        </Grid>

        <Grid container className={classes.gridMobile}
          justify='center' alignItems='center'>

          <Grid item xs={8} sm={8} md={2}
            container justify='flex-start' alignItems='center'>
            <Typography variant="h5" gutterBottom align='left'>
              <strong>
                {type === 'create' ? 'Post Opportunity' : 'Edit Opportunity'}
              </strong>
            </Typography>
          </Grid>

          <Grid item xs={8} sm={8} md={8}>
            <MobileStepper
              variant="dots"
              steps={6}
              position="static"
              activeStep={this.state.activeStep}
              className={classes.stepperMobile} />
          </Grid>
        </Grid>

        <Grid container className={classes.stepperRootMain}
          justify='center' alignItems='center'>

          <Grid item xs={12} sm={10} md={8} container justify='center'>
            {this.getStepContent(activeStep)}
            {flowNav}
          </Grid>

        </Grid>

        <SubmitModal
          open={modalOpen}
          modalType={type}
          handleClose={this.handleModalClose}
          handleReset={this.handleReset}/>

      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityChange));
