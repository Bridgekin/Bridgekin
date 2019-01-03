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


import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  // registerWaitlist: (user) => dispatch(registerWaitlist(user))
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
    marginTop: 75
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
    border: '1px solid red'
  },
  flowNav:{
    display: 'flex',
    justifyContent:'space-between',
    marginTop: 30
  },
  flowButton: {
    margin: '0px 20px 0px 20px',
    fontSize: 20,
    fontWeight: 500,
    width: 120
  }
  });

class OpportunityCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  getSteps() {
    return ['Need', 'Industry', 'Geography','Value', 'Description', 'Post'];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return 'What are your business needs?';
      case 1:
        return 'In what industries are the product/service you want to find?';
      case 2:
        return 'What is your geographical focus?';
      case 3:
        return "What's the value of your deal?";
      case 4:
        return 'Description';
      case 5:
        return 'Submit Opportunity';
      default:
        return 'Unknown step';
    }
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  render (){
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root}
          justify='space-around' alignItems='center'>

          <Grid item xs={10} sm={2} className={classes.accountNavSection}>
            <Typography className={classes.waitlistCTA} variant="h4" gutterBottom>
              <strong>My Profile</strong>
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
              <Typography className={classes.instructions}>
                {this.getStepContent(activeStep)}
              </Typography>

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
                  onClick={this.handleNext}
                  className={classes.flowButton}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </Grid>
          )}
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityCreate));
