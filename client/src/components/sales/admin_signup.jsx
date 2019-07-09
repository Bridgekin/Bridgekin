import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Loading from '../loading';
import queryString from 'query-string'

import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './stripe/CheckoutForm';
import { fetchAdminSignupLink } from '../../actions/sales_admin_signup_actions'
import { validateUnique } from '../../actions/util_actions'
import { adminSignup } from '../../actions/session_actions'
import { openSignup } from '../../actions/modal_actions';

import Capitalize from 'capitalize';

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  page: ownProps.match.params.page,
  code: values.code,
  adminSignupLink: state.entities.sales.adminSignupLink
}};

const mapDispatchToProps = dispatch => ({
  fetchAdminSignupLink: (code) => dispatch(fetchAdminSignupLink(code)),
  validateUnique: payload => dispatch(validateUnique(payload)),
  adminSignup: payload => dispatch(adminSignup(payload))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
  subPart:{
    margin: 5
  }
})

class AdminSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: 'asdf',
      lname: 'asdfasdf',
      email: 'tester@email.com',
      password: 'password',
      domain: 'tester.com',
      title: 'tester',
      loaded: false,
      validTitle: true,
      validDomain: true,
      titleError: "",
      domainError: "",
      emailError: "",
      checkingValid: false,
      duration: "",
      renewal: true,
      amount: 0,
      seats: 0,
      line1: "asdfasdfasdf",
      city: "asdfasdfasdf",
      state: "CA",
      zipcode: "94063"
    }

    this.domainModelMap = {
      domain: "SalesNetwork",
      title: "SalesNetwork",
      email: "User"
    }

    this.timeout = {};
    this.getContent = this.getContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleValidateChange = this.handleValidateChange.bind(this);
    this.isReadySubmit = this.isReadySubmit.bind(this);
  }

  componentDidMount(){
    const { code } = this.props; 
    this.props.fetchAdminSignupLink(code)
    .then(() => {
      const { adminSignupLink } = this.props;
      if(adminSignupLink.id){
        this.setState({ 
          loaded: true,
          duration: adminSignupLink.duration,
          renewal: adminSignupLink.renewal,
          seats: adminSignupLink.seats,
          amount: adminSignupLink.amount
        })
      } else {
        this.setState({ loaded: true})
      }
    })
  }

  changePage(url){
    return e => {
      this.props.history.push(url)
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleValidateChange(field, fieldError) {
    return e => {
      let input = e.target.value;
      this.setState({
        [field]: input,
        checkingValid: true
      }, () => {
        clearTimeout(this.timeout[field]);
        this.timeout[field] = setTimeout(() => {
          let payload = {
            input, field,
            model: this.domainModelMap[field],
          }
          this.props.validateUnique(payload)
            .then((resp) => {
              if (resp) {
                this.setState({ 
                  [fieldError]: "",
                  checkingValid: false
                })
              } else {
                let error = `${Capitalize(field)} has already been taken`
                this.setState({ [fieldError]: error })
              }
            })
        }, 1000)
      })
    }
  }

  handleChangePage(target){
    return e => {
      const { code} = this.props;
      
      if (target === 'payment'){
        this.props.history.push(`/sales/admin_signup/payment?code=${code}`)
      }
    }
  }

  async handleSubmit(tokenId){
    const { adminSignupLink } = this.props
    const { duration, renewal, amount, seats,
    fname, lname, email, password, title,
    domain, line1, city, state, zipcode } = this.state;

    let payload = { 
      user: { fname, lname, email, password },
      domain: { title, domain },
      purchase: { duration, renewal, amount, seats, tokenId },
      address: { line1, city, state, zipcode },
      adminSignupLinkId: adminSignupLink.id
    }
    this.props.adminSignup(payload)
    .then(() => {
      this.props.openSignup({ page: "response" })
    })
    // let response = await fetch("/api/charge", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization": localStorage.getItem('bridgekinToken')
    //   }
    // });

    // if(response.ok){
    //   console.log("Purchase Complete!")
    // }
  }

  isReadySubmit(){
    const { page } = this.props;
    const { fname, lname, email, password,
      address, city, state, zipcode,
      title, domain } = this.state;
    
    if(page === "signup"){
      return !fname && !lname && !email && !password && !title && !domain
    } else if (page === 'payment'){
      return !address && !city && !state && !zipcode
    }
  }

  getContent(){
    const { classes, page, adminSignupLink, 
      code } = this.props;
    const { duration, renewal, amount, seats,
      fname, lname, email, password,
      title, domain, titleError,
      line1, city, state, zipcode,
      domainError, emailError, checkingValid } = this.state;

    switch(page){
      case "payment":
        let payment = <Grid item md={4} sm={7} xs={10}
          style={{ marginTop: 30 }}>
          <Paper style={{ padding: 20 }}>
            <Typography fullWidth gutterBottom
              color="textPrimary">
              {`Your Subscription`}
            </Typography>
            <Grid container justify='center'>
              <Typography color='textSecondary'
              className={classes.subPart}>
                {`Seats: ${seats}`}
              </Typography>
              <Typography color='textSecondary'
                className={classes.subPart}>
                {`Amount: ${amount}`}
              </Typography>
            </Grid>
            <Grid container justify='center'>
              <Typography color='textSecondary'
                className={classes.subPart}>
                {`Duration: ${Capitalize(duration)}`}
              </Typography>
              <Typography color='textSecondary'
                className={classes.subPart}>
                {`Renewal: ${renewal ? "Yes" : "No"}`}
              </Typography>
            </Grid>
            
            <Typography fullWidth gutterBottom
              color="textPrimary"
              style={{ marginTop: 20}}>
              {`Your Billing address`}
            </Typography>
            <TextField fullWidth required
              variant="outlined"
              label='Address'
              margin='dense'
              placeholder='Eg: 1234 San Francisco St'
              onChange={this.handleChange('line1')}
              value={line1}
            />
            <TextField fullWidth required
              variant="outlined"
              label='City'
              margin='dense'
              placeholder='Eg: San Francisco'
              onChange={this.handleChange('city')}
              value={city}
            />
            <Grid container justify='space-between'
            spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required
                  variant="outlined"
                  label='State'
                  margin='dense'
                  placeholder='Eg: CA'
                  onChange={this.handleChange('state')}
                  value={state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required
                  variant="outlined"
                  label='Zipcode'
                  margin='dense'
                  placeholder='Eg: 98765'
                  onChange={this.handleChange('zipcode')}
                  value={zipcode}
                />
              </Grid>
            </Grid>

            <Typography fullWidth gutterBottom
              color="textPrimary"
              style={{ marginTop: 20 }}>
              {`Your Payment Info`}
            </Typography>
            <StripeProvider apiKey="pk_test_JpU6aXRHvBJwtouW85ahDYEQ003JUvFNHL">
              <Elements>
                <CheckoutForm 
                canSubmit={this.isReadySubmit()}
                handleSubmit={this.handleSubmit}/>
              </Elements>
            </StripeProvider>
          </Paper>
        </Grid>
        return payment;
      case "signup":
        let createAccount = <div>
          <Typography color="textPrimary" gutterBottom
            align='center'
            style={{ fontSize: 18, fontWeight: 600 }}>
            {`Create Your Account`}
          </Typography>
          <TextField fullWidth
            variant="outlined"
            label='First Name'
            margin='dense'
            placeholder='Eg: Joe'
            onChange={this.handleChange('fname')}
            value={fname}
          />
          <TextField fullWidth
            variant="outlined"
            label='Last Name'
            margin='dense'
            placeholder='Eg: Lopardo'
            onChange={this.handleChange('lname')}
            value={lname}
          />
          <TextField fullWidth
            variant="outlined"
            label='Email Name'
            margin='dense'
            placeholder='Eg: joe@bridgekin.com'
            onChange={this.handleValidateChange('email', 'emailError')}
            value={email}
          />
          {emailError && <Typography fullWidth
            style={{ color: "red", fontSize: 12 }}>
            {emailError}
          </Typography>}
          <TextField fullWidth
            variant="outlined"
            label='Password'
            margin='dense'
            type="Password"
            placeholder='Eg: Really complicated password...'
            onChange={this.handleChange('password')}
            value={password}
          />
        </div>

        let createCompany = <div>
          <Typography color="textPrimary" gutterBottom
            align='center'
            style={{ fontSize: 18, fontWeight: 600, marginTop: 30 }}>
            {`My Company`}
          </Typography>
          <TextField fullWidth
            variant="outlined"
            label='Company Title'
            margin='dense'
            placeholder='Eg: Bridgekin'
            onChange={this.handleValidateChange('title', 'titleError')}
            value={title}
          />
          {titleError && <Typography fullWidth
          style={{ color: "red", fontSize: 12}}>
            {titleError}
          </Typography>}
          <TextField fullWidth
            variant="outlined"
            label='Company Domain'
            margin='dense'
            placeholder='Eg: bridgekin.com'
            onChange={this.handleValidateChange('domain', 'domainError')}
            value={domain}
          />
          {domainError && <Typography fullWidth
            style={{ color: "red", fontSize: 12 }}>
            {domainError}
          </Typography>}
        </div>

        let submit = <Grid container justify='center'>
          <Button color='primary' variant='contained'
            disabled={this.isReadySubmit() || checkingValid}
            onClick={this.handleChangePage('payment')}
          style={{ marginTop: 15}}>
            {`Next`}
          </Button>
        </Grid>

        let signup = <Grid item md={4} sm={7} xs={10}
          container
          style={{ marginTop: 30}}>
          <Paper style={{ padding: 20 }}>
            {createAccount}
            {createCompany}
            {submit}
          </Paper>
        </Grid>
        return signup;
      default:
        let backToHome = <Grid container justify='center'>
          <Button color='primary' variant='contained'
          onClick={() => this.props.history.push('/')}>
            {`Back to landing page`}
          </Button>
        </Grid>
        return backToHome
    }
  }

  render() {
    const { classes, dimensions } = this.props;
    const { loaded } = this.state;

    if(loaded){
      return <div style={{minHeight: dimensions.height}}>
        <Grid container justify='center'
          className={classes.grid}>
          {this.getContent()}
        </Grid>
      </div>
    } else {
      return <Grid container justify='center' 
        alignItems='center' style={{ minHeight: dimensions.height }}>
        <Loading />
      </Grid>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminSignup));
