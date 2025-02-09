import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ImportGoogle from '../google/import_contacts';
import Capitalize from 'capitalize';
import { searchNetworks } from '../../actions/sales_network_actions';
import { salesSignup, googleSalesLogin, salesInviteSignup } from '../../actions/session_actions';
import { login } from '../../actions/session_actions';
import { openSignup, openLogin } from '../../actions/modal_actions';
import { clearSearchResults } from '../../actions/sales_network_actions'
import { fetchInviteByCode } from '../../actions/sales_invites_actions';

import queryString from 'query-string';
import SignupPic from '../../static/signup_pic.png';
import Img from 'react-image'
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  resultNetworks: state.entities.sales.searchNetworks,
  userErrors: state.errors.users,
  networkDetails: state.entities.sales.networkDetails,
  page: ownProps.match.params.page,
  salesNetworks: state.entities.sales.salesNetworks,
  salesInvites: state.entities.sales.salesInvites,
  code: values.code
}};

const mapDispatchToProps = dispatch => ({
  searchNetworks: title => dispatch(searchNetworks(title)),
  salesSignup: payload => dispatch(salesSignup(payload)),
  login: (user) => dispatch(login(user)),
  openSignup: (payload) => dispatch(openSignup(payload)),
  openLogin: (payload) => dispatch(openLogin(payload)),
  googleSalesLogin: (payload) => dispatch(googleSalesLogin(payload)),
  clearSearchResults: () => dispatch(clearSearchResults()),
  fetchInviteByCode: code => dispatch(fetchInviteByCode(code)),
  salesInviteSignup: payload => dispatch(salesInviteSignup(payload))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
  results: {
    border: `1px solid #d3d3d3`,
    padding: 10,
    margin: 20
  },
  companyDivider:{
    borderRight: `1px solid grey`, 
    height: 'auto', marginTop: 30,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  result: {
    margin: "5px 0px"
  },
  resultContainer:{
    overflow: 'scroll',
    maxHeight: 300
  },
  signupPic: {
    width: '100%',
    maxWidth: 400,
    height: 'auto'
  },
})

class SalesLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      networkDomainUrl: '',
      page: 'login',
      target: {},
      termsAgreement: false,
      invite: null,
      signupType: "network"
    }

    this.handleChange = this.handleChange.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.retrieveNetworks = this.retrieveNetworks.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.getLoginInfo = this.getLoginInfo.bind(this);
  }

  componentDidMount(){
    this.props.clearSearchResults();

    const { code, page } = this.props;

    if(code){
      this.props.fetchInviteByCode(code)
      .then(() => {
        const { salesInvites, salesNetworks } = this.props;
        let invite;
        // Find the invite
        Object.values(salesInvites).forEach(result => {
          if(result.linkCode === code){
            invite = result;
          }
        })
        // Set the invite type
        let signupType = invite.networkId ? "network" : "user"
        let target = invite.networkId ? salesNetworks[invite.networkId] : null

        this.setState({ invite,
          fname: invite.fname,
          lname: invite.lname,
          email: invite.email,
          signupType, target
        },() => {
          if (page === "login"){
            this.props.history.push(`sales/signup?code=${code}`)
          }
        })
      })
    } else if(page === "signup" && !code){
      this.props.history.push('/sales/login')
    }
  }

  handleChange(field){
    return e => {
      if (field === 'termsAgreement') {
        this.setState({ [field]: e.target.checked });
      }
      else {
        this.setState({ [field]: e.target.value });
      }
    }
  }

  handlePage(page = "", network = {}){
    return async e => {
      this.props.clearSearchResults();
      this.setState({ target: network, email: '', fname: '', lname: '', password: '' });
      await this.props.history.push(`/sales/login/${page}`)
    }
  }

  handleSignup(e){
    const { code } = this.props;
    const { email, password, fname, lname, target, signupType } = this.state;
    let payload = { email, password, fname, lname,
      code }

    if (signupType === "network"){
      payload = merge({}, payload, { domain: target.domain })
    }

    if(code){
      this.props.salesInviteSignup(payload)
        .then(() => {
          const { currentUser } = this.props;
          if(currentUser){
            this.props.history.push('/sales/connect_social')
          } else {
            this.props.openSignup({ page: 'response' });
          }
        })
    } else {
      this.props.salesSignup(payload)
      .then(() => { 
        this.props.openSignup({ page: 'response' });
      })
    }
  }

  handleLogin(){
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user)
    .then(() => {
      if(this.props.currentUser){
        this.props.history.push('/sales/dashboard')
      } else {
        this.props.openLogin({ page: "response"})
      }
    })
  }

  isDisabled(detail){
    if (!detail){ return true }
    const { currentSubEnd, maxSeats, memberCount } = detail
    if (currentSubEnd === "no sub" || maxSeats === "no sub" ){ return true }
    let jsDate = new Date(currentSubEnd)
    let now = new Date()
    if(memberCount >= maxSeats || jsDate < now){
      return true
    }
    return false
  }

  retrieveNetworks(){
    const { networkDomainUrl } = this.state;
    // debugger
    this.props.clearSearchResults();
    this.props.searchNetworks(networkDomainUrl)
  }

  getLoginInfo(payload){
    this.props.googleSalesLogin(payload)
    .then(() => {
      const { currentUser } = this.props;
      if (currentUser) {
        this.props.history.push('/sales/dashboard')
      } else {
        this.props.openLogin({ page: "response" })
      }
    })
  }

  getContent(){
    const { classes, dimensions, resultNetworks, networkDetails, page } = this.props;
    const { email, password, networkDomainUrl, fname, lname, target, termsAgreement } = this.state;

    switch(page){
      case 'signup':
        let signupComp = <Grid item xs={8} sm={6} md={4}container direction='column'>
          <div style={{ marginBottom: 25 }}>
            <Button onClick={this.handlePage()}>
              {`Back`}
            </Button>
          </div>
          {!isEmpty(target) && <Typography>
            {`Company: ${Capitalize(target.title)}`}
          </Typography>}
          <TextField margin='dense'
            data-cy='fname-input'
            required
            label="First Name"
            className={classes.textField}
            variant='outlined'
            value={fname}
            onChange={this.handleChange('fname')}
            onMouseUp={this.handleChange('fname')} />
          <TextField margin='dense'
            data-cy='lname-input'
            required
            label="Last Name"
            className={classes.textField}
            variant='outlined'
            value={lname}
            onChange={this.handleChange('lname')}
            onMouseUp={this.handleChange('lname')} />
          <TextField margin='dense'
            data-cy='email-input'
            required
            label="Work Email"
            className={classes.textField}
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')} />
          <TextField margin='dense'
            data-cy='password-input'
            required
            label="Password"
            className={classes.textField}
            variant='outlined'
            value={password}
            type='password'
            onChange={this.handleChange('password')}
            onMouseUp={this.handleChange('password')} />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAgreement}
                data-cy='terms-checkbox'
                onChange={this.handleChange('termsAgreement')}
                value="termsAgreement"
              />
            }
            label={
              <Typography color='textSecondary'
                style={{ fontSize: 12, margin: "15px 0px" }}>
                {`By registering, I confirm that I have read and agree to the `}
                <Link to="/privacypolicy" target="_blank">Privacy Policy</Link> {` and `}
                <Link to="/useragreement" target="_blank">User Agreement.</Link>
              </Typography>
            }
          />
          <div style={{ marginTop: 20}}>
            <Button color='primary' variant='contained'
            disabled={!termsAgreement}
            data-cy='submit-button'
            onClick={this.handleSignup}>
              {`Signup`}
            </Button>
          </div>
        </Grid>

        return <Grid item xs={8} container>
          {signupComp}
          <Grid item xs={4} sm={6} md={8} container justify='flex-end' alignItems='center'>
            <Img src={SignupPic}
              className={classes.signupPic} />
          </Grid>
        </Grid>
      default:
        let loginComp = <Grid container
        style={{ marginBottom: 30}}>
          <Typography style={{ fontWeight: 600}}>
            {`Login`}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField margin='dense' fullWidth
                data-cy='email-login' 
                required
                label="Work Email"
                className={classes.textField}
                variant='outlined'
                value={email}
                margin='dense'
                onChange={this.handleChange('email')}
                onMouseUp={this.handleChange('email')}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField margin='dense' fullWidth
                data-cy='password-login'
                required
                label="Password"
                className={classes.textField}
                variant='outlined'
                value={password}
                type='password'
                margin='dense'
                onChange={this.handleChange('password')}
                onMouseUp={this.handleChange('password')} />
            </Grid>
            <Grid item xs={12} sm={2} container justify='center' alignItems='center'>
              <div>
                <Button color='primary' variant='contained'
                  data-cy='submit-button'
                  onClick={this.handleLogin}>
                  {`Login`}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        
        let results = Object.values(resultNetworks)

        let findCompany = <Grid container spacing={2} 
          justify='space-between' alignItems='flex-start'
          style={{ marginTop: 30}}>
          <Grid item xs={12} sm={6} container justify='center'>
            <Typography align='center' gutterBottom
            style={{ fontSize: 16, fontWeight: 600}}>
              {`Looking to find your company? `}
            </Typography>
            <Typography align='center' gutterBottom
              style={{ fontSize: 14 }}>
              {`Enter your company URL below and press find.`}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField margin='dense' fullWidth
                  data-cy='domain-input'
                  required
                  label="Company Domain URL"
                  placeholder='Eg: Bridgekin'
                  className={classes.textField}
                  variant='outlined'
                  value={networkDomainUrl}
                  onChange={this.handleChange('networkDomainUrl')}
                  onMouseUp={this.handleChange('networkDomainUrl')} />
              </Grid>
              <Grid item xs={4} container justify='center' alignItems='center'>
                <div>
                  <Button color='primary' variant='contained'
                    data-cy='search-networks-button'
                  onClick={this.retrieveNetworks}>
                    {`Find`}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {results.length > 0 && <Grid container justify='center'
            style={{ padding: "0px 10px", borderBottom: `1px solid grey`}}>
              <Typography color='textPrimary' 
                align='center' fullWidth
                style={{fontSize: 16, fontWeight: 600}}>
                {`Results`}
              </Typography>
              <Grid container>
                <Typography color='textSecondary'
                  style={{fontSize: 16, textTransform:'italic'}}>
                  {`Network Title`}
                </Typography>
              </Grid> 
              <Grid container
                className={classes.resultContainer}>
                {results.map(network => {
                  let detail = networkDetails[network.id]
                  return <Grid item container
                  data-cy='domain-result'
                  justify='space-between' 
                  className={classes.result}>
                    <Typography color='textPrimary'
                    style={{ fontSize: 14}}>
                      {`${Capitalize(network.title)}`}
                    </Typography>
                    <Button variant='contained' color='primary'
                      data-cy='choose-network-button'
                    disabled={this.isDisabled(detail)}
                    onClick={this.handlePage('signup',network)}>
                      {`Select`}
                    </Button>
                  </Grid>
                })}
              </Grid>
            </Grid>}
          </Grid>
        </Grid>

        let loginCompany = <Grid container spacing={2}
        style={{ margin: "20px 0px"}}>
          <Grid item xs={10} sm={6} container direction='column' alignItems='center'>
            <Typography align='center'
              gutterBottom fullWidth
              style={{ fontSize: 16, fontWeight: 600 }}>
              {`Login/Signup Via Gmail`}
            </Typography>
            <ImportGoogle asLogin getLoginInfo={this.getLoginInfo} />
          </Grid>
        </Grid>

        let divider = <Grid container alignItems='center'>
          <div style={{ flexGrow: 1, borderTop: `1px solid grey`}}/>
          <Typography color='textSecondary' style={{ margin: '0px 10px'}}>
            {`OR`}
          </Typography>
          <div style={{ flexGrow: 1, borderTop: `1px solid grey` }} />
        </Grid>

        return <Grid item xs={10} sm={8}>
          {loginComp}
          {/* {divider}
          {loginCompany} */}
          {divider}
          {findCompany}
        </Grid>
    }
  }

  render() {
    const { classes, dimensions, searchNetworks } = this.props;
    const { email, password, networkDomainUrl } = this.state;

    
    return (
      <Grid container justify='center' alignItems='center' className={classes.grid}
        style={{ minHeight: dimensions.height }}>
        {this.getContent()}
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesLogin));
