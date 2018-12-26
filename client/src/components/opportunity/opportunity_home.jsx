import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import './opportunity_home.css'

import OpportunityCard from './opportunity_card';
import OpportunityReferral from './opportunity_referral';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  // registerWaitlist: (user) => dispatch(registerWaitlist(user))
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    margin: "15px 0px 15px 0px"
  },
  homeheader:{
    minHeight: 350
  },
  headerTypography:{
    margin: "25px 0px 25px 0px"
  },
  grid:{
    borderBottom: "1px solid #D3D3D3",
    margin: "15px 0px 15px 0px"
  },
  button:{
    minWidth: 150
  },
  chipContainer:{
    marginTop: 40
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  paper: {
    position: 'absolute',
    width: '40%',
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  refButton:{
    fontSize: 20,
    fontWeight: 700,
    marginTop: 25,
    height: 55,
    width: 200
  }
});


class OpportunityHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      referralLink: '',
      network: ''
    };

    this.opportunities = [
      {
        pictureURL: '',
        title: 'Test house',
        description: 'This is a test house where you can see what a card would look like beforehand',
        geography: 'Italy',
        industry: 'Real Estate and Housing',
        value: 'Over 500k'
      },
      {
        pictureURL: '',
        title: 'Test house',
        description: 'This is a test house where you can see what a card would look like beforehand',
        geography: 'Italy',
        industry: 'Real Estate and Housing',
        value: 'Over 500k'
      },
    ];

    this.handleReferralChange = this.handleReferralChange.bind(this);
  }

  handleReferralChange(e){
    e.preventDefault();
    this.setState({ network: e.target.value})
  }

  render (){
    let classes = this.props.classes;

    let header = (
      <Grid container className={classes.root}
        justify="center" alignItems="center">

        <Grid item xs={10} justify="center" alignItems="center"
          className={[classes.homeheader, classes.grid].join(' ')}>
          <Typography variant="h2" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            Welcome, {this.props.currentUser.fname}
          </Typography>

          <Typography variant="h4" gutterBottom align='center'>
            There are 1500 opportunities for you to check out
          </Typography>

          <Typography variant="p" gutterBottom align='center'
            color="secondary">
            Connect with the opportunities that may be perfect for
            you or a trusted contact in your network
          </Typography>

          <Grid container justify="space-around" alignItems="center"
            className={[classes.root, classes.chipContainer].join(' ')}>

            <Grid item xs={10} sm={3} justify='center'>
              <Button variant="contained" color='primary'
                className={classes.button}>
                <p className='fc-header-p'>
                  <span className='fc-header-number'><strong>35</strong></span>
                    New Opportunities
                </p>
              </Button>
            </Grid>

            <Grid item xs={10} sm={3} justify='center'>
              <Button variant="contained" color='primary'
                className={classes.button}>
                <p className='fc-header-p'>
                  <span className='fc-header-number'><strong>35</strong></span>
                    New Opportunities
                </p>
              </Button>
            </Grid>

            <Grid item xs={10} sm={3} justify='center'>
              <Button variant="contained" color='primary'
                className={classes.button}>
                <p className='fc-header-p'>
                  <span className='fc-header-number'><strong>35</strong></span>
                    New Opportunities
                </p>
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    )

    let opportunities = this.opportunities.map(opportunity => (
      <Grid item sm={10} md={5} justify="center" alignItems="center"
        className={classes.grid}>
        <OpportunityCard opportunity={opportunity} classes={classes}/>
      </Grid>
    ));

    let opportunityGrid = (
      <Grid container className={classes.root}
        justify="center" alignItems="center" spacing={24}>

        <Grid item xs={10} justify="flex-end" alignItems="center">
          Opportunities
        </Grid>

        {opportunities}
      </Grid>
    )

    let referralGridWaitlist = (
      <Grid container className={classes.root}
        justify="center" alignItems="center" spacing={24}>

        <Grid item xs={9} justify="flex-end" alignItems="center">
          <Typography variant="h4" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            Refer a trusted contact that would appreciate joining our community
            and we'll add them to our waitlist
          </Typography>
        </Grid>

        <Grid container className={classes.root} directon='column'
          justify="center" alignItems="center" spacing={24}>
          <Grid item xs={10} sm={3} justify="flex-end" alignItems="center">
            <TextField
            required
            id="outlined-required"
            label="First Name"
            placeholder="John"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          </Grid>
          <Grid item xs={10} sm={4} justify="flex-end" alignItems="center">
            <TextField
            required
            id="outlined-required"
            label="Last Name"
            placeholder="Smith"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          </Grid>
          <div className={classes.wrapper}>
            <Button variant="contained" color='secondary' fullWidth
              className={classes.refButton}>
              Create Link
            </Button>
          </div>
        </Grid>
      </Grid>
    );

    let networks = ([
      <MenuItem value={10}>Ten</MenuItem>,
      <MenuItem value={20}>Twenty</MenuItem>,
      <MenuItem value={30}>Thirty</MenuItem>
    ])

    let referralGridLink = (
      <Grid container className={classes.root}
        justify="center" alignItems="center" spacing={24}>

        <Grid item xs={9} justify="flex-end" alignItems="center">
          <Typography variant="h4" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            Refer a trusted contact that would appreciate joining our community
            and we'll add them to our waitlist
          </Typography>
        </Grid>

        <Grid container className={classes.root}
          justify="center" alignItems="center" spacing={24}>

          <Grid item xs={10} sm={4} justify="center" alignItems="center">
            <Typography variant="h6" gutterBottom align='center'
              color="secondary" className={classes.headerTypography}>
              Refer a contact to your network
            </Typography>

            <FormControl className={classes.formControl} fullWidth>
              <Select
                value={this.state.age}
                onChange={this.handleChange}
                name="age"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>
                  Placeholder
                </MenuItem>
                <MenuItem value=''>Bridgekin</MenuItem>,
                <MenuItem value='The Battery'>The Battery</MenuItem>,
              </Select>
              <FormHelperText>Networks</FormHelperText>
            </FormControl>

            <div className={classes.wrapper}>
              <Button variant="contained" color='secondary' fullWidth
                className={classes.refButton}>
                Create Link
              </Button>
            </div>
          </Grid>

          <Grid item xs={10} sm={4} justify="center" alignItems="center">
            <TextField
            required
            id="outlined-required"
            placeholder='Link displays here'
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="filled"
            value={this.state.referralLink}
            />
          </Grid>

        </Grid>

      </Grid>
    );

    if(this.props.currentUser){
      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container className={classes.root}>
            {header}
            {opportunityGrid}
            <OpportunityReferral classes={classes}
              referralLink={this.state.referralLink}
              handleChange={this.handleReferralChange}
              network={this.state.network}/>
          </Grid>
        </MuiThemeProvider>
      )
    }
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityHome));
