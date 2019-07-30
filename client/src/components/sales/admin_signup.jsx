import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Loading from '../loading';
import queryString from 'query-string'

import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './stripe/CheckoutForm';
import { fetchAdminSignupLink } from '../../actions/sales_admin_signup_actions'
import { validateUnique } from '../../actions/util_actions'
import { adminSignup } from '../../actions/session_actions'
import { openSignup } from '../../actions/modal_actions';

import Capitalize from 'capitalize';
import SignupPic from '../../static/signup_pic.png';
import Img from 'react-image'

import { fetchUserNetworks, setCurrentNetwork } from '../../actions/sales_network_actions'

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  page: ownProps.match.params.page,
  code: values.code,
  adminSignupLink: state.entities.sales.adminSignupLink,
  salesProducts: state.entities.sales.salesProducts,
}};

const mapDispatchToProps = dispatch => ({
  fetchAdminSignupLink: (code) => dispatch(fetchAdminSignupLink(code)),
  validateUnique: payload => dispatch(validateUnique(payload)),
  adminSignup: payload => dispatch(adminSignup(payload)),
  openSignup: () => dispatch(openSignup()),
  fetchUserNetworks: () => dispatch(fetchUserNetworks()),
  setCurrentNetwork: (networkId) => dispatch(setCurrentNetwork(networkId))
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
  },
  signupPic:{
    width: '100%',
    maxWidth: 500,
    height: 'auto'
  },
  paymentDivider: {
    borderTop: `4px solid black`,
    margin: "20px 0px",
    width: '100%'
  },
  paymentCallout:{
    fontSize: 16, fontWeight: 600
  },
  renewOther:{ fontSize: 16},
  renewBold: { fontSize: 16, fontWeight: 600}
})

class AdminSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      domain: '',
      title: '',
      loaded: false,
      validTitle: true,
      validDomain: true,
      titleError: "",
      domainError: "",
      emailError: "",
      checkingValid: false,
      line1: '',
      city: '',
      state: '',
      zipcode: '',
      msa: false,
      termsAgreement: false,
      duration: "monthly",
      renewal: true,
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
    this.isDisabledSubmit = this.isDisabledSubmit.bind(this);
    this.handleCheckedChange = this.handleCheckedChange.bind(this);
  }

  componentDidMount(){
    const { code } = this.props; 
    this.props.fetchAdminSignupLink(code)
    .then(() => {
      const { adminSignupLink } = this.props;
      this.setState({ loaded: true })
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

  handleCheckedChange(field){
    return e => {
      if (field === "duration"){
        let checked = e.target.checked;
        this.setState({ [field]: checked ? 'yearly' : 'monthly' })
      } else {
        this.setState({ [field]: e.target.checked})
      }
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
      purchase: { duration, renewal, tokenId, productId: adminSignupLink.productId },
      address: { line1, city, state, zipcode }
    }
    this.props.adminSignup(payload)
    .then(() => {
      if(this.props.currentUser){
        // this.loadUserNetworks()
        this.props.history.push('/sales/dashboard')
      } else {
        this.props.openSignup({ page: "response" })
      }
    })
  }

  isDisabledSubmit(){
    const { page } = this.props;
    const { fname, lname, email, password,
      line1, city, state, zipcode,
      title, domain, termsAgreement} = this.state;

    if(page === "signup"){
      return !fname || !lname || !email || !password || !title || !domain || !termsAgreement
    }
    return false
  }

  getContent(){
    const { classes, page, adminSignupLink, 
      code, salesProducts } = this.props;
    const { duration, renewal,
      fname, lname, email, password,
      title, domain, titleError,
      line1, city, state, zipcode,
      domainError, emailError, checkingValid,
      msa, termsAgreement } = this.state;

    let product = salesProducts[adminSignupLink.productId]

    switch(page){
      case "payment":
        let yourSub = <div>
          <Typography fullWidth gutterBottom
            color="textPrimary" align='left'
            style={{ fontSize: 18}}>
            {`Your Subscription`}
          </Typography>
          <Grid container>
            <Typography color='textSecondary'
              data-cy="seats-count"
              className={classes.subDetail}
              style={{ marginRight: 10}}>
              {`Seats: ${product.seats}`}
            </Typography>
            <Typography color='textSecondary'
              data-cy="period-amount"
              className={classes.subDetail}>
              {`Amount: $${duration === 'monthly' ? product.monthlyAmount : product.yearlyAmount}`}
            </Typography>
          </Grid>
          <Typography color='textSecondary'
            className={classes.subDetail}>
            {`Length: ${Capitalize(duration)}`}
          </Typography>
        </div>

        // let billingInfo = <Grid container>
        //   <Typography fullWidth gutterBottom
        //     color="textPrimary"
        //     style={{ marginTop: 20 }}>
        //     {`Your Billing address`}
        //   </Typography>
        //   <TextField fullWidth required
        //     variant="outlined"
        //     label='Address'
        //     margin='dense'
        //     placeholder='Eg: 1234 San Francisco St'
        //     onChange={this.handleChange('line1')}
        //     value={line1}
        //   />
        //   <TextField fullWidth required
        //     variant="outlined"
        //     label='City'
        //     margin='dense'
        //     placeholder='Eg: San Francisco'
        //     onChange={this.handleChange('city')}
        //     value={city}
        //   />
        //   <Grid container justify='space-between'
        //     spacing={2}>
        //     <Grid item xs={12} sm={6}>
        //       <TextField fullWidth required
        //         variant="outlined"
        //         label='State'
        //         margin='dense'
        //         placeholder='Eg: CA'
        //         onChange={this.handleChange('state')}
        //         value={state}
        //       />
        //     </Grid>
        //     <Grid item xs={12} sm={6}>
        //       <TextField fullWidth required
        //         variant="outlined"
        //         label='Zipcode'
        //         margin='dense'
        //         placeholder='Eg: 98765'
        //         onChange={this.handleChange('zipcode')}
        //         value={zipcode}
        //       />
        //     </Grid>
        //   </Grid>
        // </Grid>
        
        let ccInfo = <div>
          <Typography fullWidth gutterBottom
            color="textPrimary"
            style={{ marginTop: 20 }}>
            {`Your Payment Info`}
          </Typography>
          <StripeProvider apiKey={window.stripe_pk}>
            <Elements>
              <CheckoutForm
                canSubmit={this.isDisabledSubmit()}
                handleSubmit={this.handleSubmit} />
            </Elements>
          </StripeProvider>
        </div>

        let paymentInfo = <Grid item md={5} sm={6} xs={10}>
          {yourSub}
          {/* {billingInfo} */}
          {ccInfo}
        </Grid>

        let subCard = <Grid item xs={10} sm={5} container justify='center' alignItems='center'>
          <Grid container style={{ backgroundColor: '#F1F1F1', padding: 40 }}>
            <div className={classes.paymentDivider} />
            <Grid container alignItems='flex-end'>
              <Typography style={{ fontSize: 50, marginRight: 10 }}>
                {`$${duration === "monthly" ? (product.monthlyAmount / product.seats) : (product.yearlyAmount/12/ product.seats)}`}
              </Typography>
              <Typography color='textSecondary'
                style={{ fontSize: 18 }}>
                {`User/Month`}
              </Typography>
            </Grid>
            <Grid container>
              <Typography style={{ fontSize: 18 }}>
                {`Billed as $${duration === "monthly" ? product.monthlyAmount : product.yearlyAmount} per ${duration === "monthly" ? "month" : "year"}`}
              </Typography>
            </Grid>
            <div className={classes.paymentDivider} />
            <Typography color='textPrimary' gutterBottom className={classes.paymentCallout}>
              {`Unlimited contacts uploaded`}
            </Typography>
            <Typography color='textPrimary' className={classes.paymentCallout}>
              {`Unlimited introductions received`}
            </Typography>
            {/* <Typography gutterBottom
              style={{ fontSize: 15}}>
              <Checkbox
                checked={renewal}
                onChange={this.handleCheckedChange('renewal')}
                value="renewal"
              />
              {`Automatically renew subscription`}
            </Typography> */}
          </Grid>

          <Grid container style={{ marginTop: 20}}>
            <Grid item xs={5}>
              <Typography align='center'
              className={duration === 'monthly' ? classes.renewBold : classes.renewOther}>
                {`Monthly Billing`}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                data-cy="toggle-period"
                checked={duration === 'yearly'}
                onChange={this.handleCheckedChange('duration')}
                value="duration"
              />
            </Grid>
            <Grid item xs={5}>
              <Typography align='center'
              className={duration === 'yearly' ? classes.renewBold : classes.renewOther}>
                {`Annual Billing`} <br/>
                {`Save ${Math.ceil((1 - (product.yearlyAmount / 12 / product.seats)/ (product.monthlyAmount / product.seats)) * 100)}%`}
              </Typography>
            </Grid>
          </Grid>
          <Typography>
            {}
          </Typography>
        </Grid>

        let payment = <Grid container justify='center'
          style={{ marginTop: 30 }}>
          <Grid item xs={11} sm={9} container justify='space-between' alignItems='flex-start'>
            {subCard}
            {paymentInfo}
          </Grid>
        </Grid>

        return <div style={{ marginTop: 50 }}>
          <Typography align='center' gutterBottom
          style={{ fontSize: 36, fontWeight: 600}}>
            {`Try Bridgekin free for 7 days`}
          </Typography>
          <Typography align='center' gutterBottom
            style={{ fontSize: 18 }}>
            {`No Obligation. No Risk.`}
          </Typography>
          {payment}
        </div>;
      case "signup":
        let createAccount = <div>
          <Typography color="textPrimary" gutterBottom
            data-cy='signup-header'
            align='center'
            style={{ fontSize: 18, fontWeight: 600 }}>
            {`Create Your Account`}
          </Typography>
          <TextField fullWidth
            data-cy="fname-input"
            variant="outlined"
            label='First Name'
            margin='dense'
            placeholder='Eg: Joe'
            onChange={this.handleChange('fname')}
            value={fname}
          />
          <TextField fullWidth
            data-cy="lname-input"
            variant="outlined"
            label='Last Name'
            margin='dense'
            placeholder='Eg: Lopardo'
            onChange={this.handleChange('lname')}
            value={lname}
          />
          <TextField fullWidth
            data-cy="email-input"
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
            data-cy="password-input"
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
            data-cy="company-title-input"
            variant="outlined"
            label='Company Name'
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
            data-cy="company-domain-input"
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

        let submit = <div style={{ marginTop: 20}}>
          <Grid container justify='center'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAgreement}
                  data-cy='terms-checkbox'
                  onChange={this.handleCheckedChange('termsAgreement')}
                  value="termsAgreement"
                />
              }
              label={
                <Typography color='textSecondary'
                  style={{ fontSize: 12, margin: "5px 0px" }}>
                  {`By registering, I confirm that I have read and agree to the `}
                  <Link to="/privacypolicy" target="_blank">Privacy Policy</Link> {` and `}
                  <Link to="/useragreement" target="_blank">User Agreement.</Link>
                </Typography>
              }
            />
            <Button color='primary' variant='contained'
              data-cy="next-button"
              disabled={this.isDisabledSubmit() || checkingValid}
              onClick={this.handleChangePage('payment')}
            style={{ marginTop: 15}}>
              {`Next`}
            </Button>
          </Grid>
        </div>

        let container = <Grid container justify='center'
        style={{ marginTop: 50}}>
          <Grid item xs={10} sm={8} container justify='space-between'>

            <Grid item xs={10} sm={5} container justify='center' alignItems='center'>
              <Img src={SignupPic} 
              className={classes.signupPic} />
            </Grid>
            <Grid item md={5} sm={6} xs={10} container justify='center'>
              {createAccount}
              {createCompany}
              {submit}
            </Grid>

          </Grid>
        </Grid>
        return container;
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
    const { classes, dimensions, adminSignupLink } = this.props;
    const { loaded } = this.state;

    if(loaded && adminSignupLink.id){
      return <div style={{minHeight: dimensions.height}}>
        <Grid container justify='center'
          className={classes.grid}>
          {this.getContent()}
        </Grid>
      </div>
    } else if (loaded && !adminSignupLink.id){
      return <Grid container justify='center'>
        <Grid item xs={10} sm={6} container justify='center'
          alignItems='center' direction='column'
          data-cy='no-link-response'
          style={{ minHeight: dimensions.height }}>
          <Typography gutterBottom align='center'
          style={{ fontSize: 36}}>
            {`Signup Link Not Found`}
          </Typography>
          <Typography gutterBottom align='center'
          style={{ fontSize: 18 }}>
            {`As a result, we can't sign you up for an admin account yet. If you'd like to learn more,please reach out to us at admin@bridgekin.com or joe@bridgekin.com.`}
          </Typography>
          <Button variant='contained' color='primary'
          style={{ marginTop: 30}}
          onClick={() => this.props.history.push('//')}>
            {`Back home`}
          </Button>
        </Grid>
      </Grid>
    } else {
      return <Grid container justify='center' 
        alignItems='center' style={{ minHeight: dimensions.height }}>
        <Loading />
      </Grid>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminSignup));
