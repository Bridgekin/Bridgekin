import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

import GeoField from './opportunity_geo';
import NeedsField from './opportunity_needs';
import IndustryField from './opportunity_industry';
import ValueField from './opportunity_value';
import DescriptionField from './opportunity_description';
import SubmitField from './opportunity_submit';
import SubmitModal from './submit_modal';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import {createOpportunity} from '../../actions/opportunity_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  // registerWaitlist: (user) => dispatch(registerWaitlist(user)),
  createOpportunity: (opp) => dispatch(createOpportunity(opp))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: '1px solid #d3d3d3'
  },
  accountNavSection:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  stepperRoot:{
    flexGrow: 1
  },
  stepperRootMain:{
    flexGrow: 1,
    marginTop: 50
  },
  step: {
    "& $completed": {
      color: "#4067B2"
    },
    "& $active": {
      color: "#ff9800"
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
    display: 'flex',
    justifyContent:'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  flowButton: {
    margin: '0px 20px 0px 20px',
    fontSize: 20,
    fontWeight: 500,
    width: 120
  }
  });

const DEFAULTSTATE = {
  activeStep: 0,
  need: '',
  geography: [],
  industry: [],
  value: '',
  title: '',
  description: '',
  networks: ['General Bridgekin Network'],
  modalOpen: false
}

class OpportunityCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, DEFAULTSTATE);

    this.handleChange = this.handleChange.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // componentDidMount(){
  //   // pull in Networks
  //   this.setState({ network: ['All Opportunities']})
  // }

  getSteps() {
    return ['Need', 'Industry', 'Geography', 'Value', 'Description', 'Post'];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <NeedsField
          handleChange={this.handleChange('need')}
          need={this.state.need}/>;
      case 1:
        return <IndustryField
          handleChange={this.handleChange('industry')}
          industry={this.state.industry}/>;
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
          networks={this.state.networks}/>;
      case 5:
        let errors = this.checkErrors();
        return <SubmitField
          title={this.state.title}
          description={this.state.description}
          networks={this.state.networks}
          value={this.state.value}
          geography={this.state.geography}
          industry={this.state.industry}
          opportunityNeeds={this.state.opportunityNeed}
          errors={errors}/>;
      default:
        return 'Unknown step';
    }
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleSubmit(){
    let { geography, industry,
      value, title, description,
      networks, need} = this.state;

    let opportunity = {geography, value, title, description,
      industries: industry, opportunity_needs: need, networks}

    this.props.createOpportunity(opportunity)
    .then(() => {
      this.setState({ modalOpen: true });
    })
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState(Object.assign({}, DEFAULTSTATE));
  };

  handleChange(field) {
    return (value) => {
      this.setState({ [field]: value });
    }
  }

  capitalize(string){
    return string[0].toUpperCase() + string.slice(1)
  }

  checkErrors(){
    const { title, description, industry, need, geography,
      value, networks } = this.state;
    let opp = { title, description, industry, need, value,
      networks, geography};
    let keys = Object.keys(opp);
    let errors = [];
    debugger;
    for (let i = 0; i < keys.length; i++){
      if(opp[keys[i]].length === 0){
        let formatted = this.capitalize(keys[i]);
        errors.push(`${formatted} is blank`);
      }
    }
    return errors;
  }

  render (){
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep, modalOpen } = this.state;

    let errors = this.checkErrors();

    let flowNav = (
      <div className={classes.flowNav}>
        <Button
          disabled={activeStep === 0}
          variant="contained"
          color="secondary"
          onClick={this.handleBack}
          className={classes.flowButton}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={
            (errors.length > 0) &&
            (activeStep === steps.length - 1)}
          onClick={ activeStep === steps.length - 1 ?
            this.handleSubmit : this.handleNext}
          className={classes.flowButton}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root}
          justify='space-around' alignItems='center'>

          <Grid item xs={10} sm={2} className={classes.accountNavSection}>
            <Typography variant="h5" gutterBottom>
              <strong>Post Opportunity</strong>
            </Typography>
          </Grid>

          <Grid item xs={10} sm={8}>
            <Stepper activeStep={activeStep} alternativeLabel
              classes={{ root: classes.stepperRoot }}>
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
                    }} >
                    {label}
                  </StepLabel>
                </Step>
                )
              )}
            </Stepper>
          </Grid>

        </Grid>

        <Grid container className={classes.stepperRootMain}
          justify='center' alignItems='center'>

          {activeStep === steps.length ? (
            <Grid item xs={10} sm={7} className={classes.mainWrapper}>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleReset}
                className={classes.flowButton}>
                Reset
              </Button>
            </Grid>
          ) : (
            <Grid item xs={10} sm={7} className={classes.mainWrapper}>
              {this.getStepContent(activeStep)}
              {flowNav}
            </Grid>
          )}
        </Grid>

        <SubmitModal open={modalOpen}
          handleClose={this.handleModalClose}
          handleReset={this.handleReset}/>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityCreate));
