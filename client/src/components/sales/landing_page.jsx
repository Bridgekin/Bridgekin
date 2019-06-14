import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Img from 'react-image'

import LandingPic from '../../static/sales_home_image.jpg';
import MoneyIcon from '../../static/sales_icons/money.svg'
import BusinessIcon from '../../static/sales_icons/business.svg'
import TimeIcon from '../../static/sales_icons/time.svg'
import WinIcon from '../../static/sales_icons/win.svg'

import { requestDemo } from '../../actions/util_actions';


const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
});

const mapDispatchToProps = dispatch => ({
  requestDemo: user => dispatch(requestDemo(user))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    // paddingBottom: '10%'
  },
  landingImage: {
    height: 612,
    width: '50%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0, right: 0,
    zIndex: 1000
  },
  login: {
    position: 'fixed',
    top: 15, right: 30,
    zIndex: 1500,
  },
  demoComponent:{
    backgroundColor: "#F2F1F1",
    height: 548, 
    padding: "40px 0px"
  },
  section:{
    padding: "40px 0px 50px"
  },
  sectionHeader:{
    fontSize: 36, fontWeight: 600
  },
  benefitText:{ fontSize: 18 },
  benefitIcon: { 
    width: 110,
    height: 120,
    objectFit: 'cover',
    objectPosition: '100% 0',
    overflow: 'hidden'
  },
  benefitCard:{
    marginTop: 30
  },
  s2Header:{ fontSize: 40, fontWeight: 600 },
  s2Text: { fontSize: 20 }
})

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      requestSent: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
    this.requestDemo = this.requestDemo.bind(this);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value });
    }
  }

  requestDemo() {
    const { fname, lname, email } = this.state;
    //do some things
    let user = { fname, lname, email, demoType: 'sales' }
    this.props.requestDemo(user)
      .then(() => this.setState({ 
        requestSent: true,
        fname: '', lname: '', email: ''
      }))
  }

  redirectLogin(){
    this.props.history.push('/sales/login')
  }

  render() {
    const { classes, dimensions, currentUser } = this.props;
    const { fname, lname, email, requestSent } = this.state;

    let landingImage = <Img src={LandingPic}
    className={classes.landingImage} />

    let loginButton = <Button variant='contained'
      color='primary' 
      onClick={this.redirectLogin}
      style={{ textTransform: 'capitalize' }}
      className={classes.login}>
      {`Login`}
    </Button>

    let demoWelcome = <Grid item xs={6} container justify='center'
      className={classes.demoComponent}>
      <Grid item xs={8}>
        <Typography gutterBottom
          style={{ fontSize: 38, fontWeight: 600 }}>
          {`Sell faster through warm referrals`}
        </Typography>
        <Typography gutterBottom
          style={{ fontSize: 16 }}>
          {`Get warm introductions into your target accounts by leveraging your team’s network. Close more deals faster and ensure everyone is winning.`}
        </Typography>

        <Grid container justify='space-between'
          style={{ marginTop: 30 }}>
          <Grid item xs={5}>
            <TextField
              required
              label="First Name"
              className={classes.textField}
              margin="dense"
              variant='outlined'
              value={fname}
              onChange={this.handleChange('fname')}
              onMouseUp={this.handleChange('fname')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              className={classes.textField}
              margin="dense"
              variant='outlined'
              value={lname}
              onChange={this.handleChange('lname')}
              onMouseUp={this.handleChange('lname')}
            />
          </Grid>
          <TextField fullWidth
            required
            label="Work Email"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')}
          />
        </Grid>

        <div style={{ marginTop: 20 }}>
          {requestSent ? <Typography
          style={{ fontSize: 16}}>
            {`Request Sent!`}
          </Typography>
          : <Button variant='contained' color='primary'
            disabled={!fname || !email}
            onClick={this.requestDemo}>
            {`Request A Demo`}
          </Button>}
        </div>
      </Grid>

      <Grid item xs={2} />
    </Grid>

    let benefitsOfBridgekin = (<div className={classes.section}
      style={{ backgroundColor: 'white' }}>
      <Grid container justify='center'>
        <Typography align='center'
          className={classes.sectionHeader}>
          {`Bridgekin Benefits`}
        </Typography>
      </Grid>

      <Grid container justify='center'>
        <Grid item xs={9} container>

          <Grid item xs={12} sm={6}
            className={classes.benefitCard}>
            <Grid container alignItems='center'
              direction='column'>
              <Img src={MoneyIcon}
                className={classes.benefitIcon} />
              <Grid item xs={5}>
                <Typography fullWidth
                  className={classes.benefitText}>
                  {`Increase your close rate by double with referred leads*`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}
            className={classes.benefitCard}>
            <Grid container alignItems='center'
              direction='column'>
              <Img src={TimeIcon}
                className={classes.benefitIcon} />
              <Grid item xs={5}>
                <Typography fullWidth
                  className={classes.benefitText}>
                  {`Stop or reduce your time outbounding and cold calling `}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}
            className={classes.benefitCard}>
            <Grid container alignItems='center'
              direction='column'>
              <Img src={WinIcon}
                className={classes.benefitIcon} />
              <Grid item xs={5}>
                <Typography fullWidth
                  className={classes.benefitText}>
                  {`Create a win-win environment and boost moral across the team`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}
            className={classes.benefitCard}>
            <Grid container alignItems='center'
              direction='column'>
              <Img src={BusinessIcon}
                className={classes.benefitIcon} />
              <Grid item xs={5}>
                <Typography fullWidth
                  className={classes.benefitText}>
                  {`Get warm introductions into the right stakeholders`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>)

    let theFacts = <Grid container 
    className={classes.section}>
      <Grid container justify='center'>
        <Typography align='center'
          className={classes.sectionHeader}>
          {`The Facts`}
        </Typography>
      </Grid>

      <Grid container justify='center'
        style={{ marginTop: 20 }}>
        <Grid item xs={9} container
          justify='space-around'>

          <Grid item xs={3}>
            <Typography align='center'
            className={classes.s2Header}>
              {`84%`}
            </Typography>
            <Typography align='center'
              className={classes.s2Text}>
              {`B2B buyers that start their buying process with a referral`}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography align='center'
              className={classes.s2Header}>
              {`24%`}
            </Typography>
            <Typography align='center'
              className={classes.s2Text}>
              {`Outbound sales emails that are ever opened`}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography align='center'
              className={classes.s2Header}>
              {`50%`}
            </Typography>
            <Typography align='center'
              className={classes.s2Text}>
              {`Traditional closing rate  of a referral lead`}
            </Typography>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>

    let demoCTA = <Grid container className={classes.section}
      justify='center'
      style={{ backgroundColor: 'white' }}>
      <Grid item xs={8}>
        <Typography align='center'
          style={{ fontSize: 48, fontWeight: 600 }}>
          {`Sell faster through warm referrals`}
        </Typography>

        <Grid container alignItems='center'
          justify='space-around'
          style={{ marginTop: 30 }}>
          <TextField
            required
            label="First Name"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={fname}
            onChange={this.handleChange('fname')}
            onMouseUp={this.handleChange('fname')}
          />
          <TextField
            label="Last Name"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={lname}
            onChange={this.handleChange('lname')}
            onMouseUp={this.handleChange('lname')}
          />
          <TextField
            required
            label="Work Email"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')}
          />
          <div>
            <Button variant='contained' color='primary'
            disabled={!fname || !email}
            onClick={this.requestDemo}>
              {`Request A Demo`}
            </Button>
          </div>
        </Grid>

      </Grid>
    </Grid>

    let footer = <Grid container justify='center'
      style={{ backgroundColor: 'black', padding: "20px 0px" }}>
      <Grid item xs={10} container justify='flex-end'>
        <Button onClick={()=>this.props.history.push('/useragreement')}
        style={{ color: 'white', textTransform: 'capitalize', marginRight: 20 }}>
          {`User Agreement`}
        </Button>
        <Button onClick={()=>this.props.history.push('/privacypolicy')}
        style={{ color: 'white', textTransform: 'capitalize'}}>
          {`Privacy Policy`}
        </Button>
      </Grid>
    </Grid>

    return <div style={{ minHeight: dimensions.height, backgroundColor: "#F2F1F1" }}>
      <Grid container className={classes.grid}>
        {landingImage}
        {!currentUser && loginButton}
        
        {demoWelcome}
        {benefitsOfBridgekin}
        {theFacts}
        {demoCTA}

        {footer}
      </Grid>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingPage));
