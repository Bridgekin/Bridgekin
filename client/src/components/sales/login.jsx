import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { searchNetworks } from '../../actions/sales_actions';
import { salesSignup } from '../../actions/session_actions';
import { login } from '../../actions/session_actions';
import { openSignup } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  resultNetworks: state.entities.sales.searchNetworks,
  userErrors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
  searchNetworks: title => dispatch(searchNetworks(title)),
  salesSignup: payload => dispatch(salesSignup(payload)),
  login: (user) => dispatch(login(user)),
  openSignup: (payload) => dispatch(openSignup(payload)),
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
  }
})

class SalesLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      networkTitle: '',
      page: 'login',
      target: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.retrieveNetworks = this.retrieveNetworks.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.backPage = this.backPage.bind(this);
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value})
    }
  }

  handlePage(network){
    return e => {
      this.setState({ target: network, page: 'signup'})
    }
  }

  handleSignup(e){
    const { email, password, fname, lname, target } = this.state;
    let payload = { email, password, fname, lname,
      domain: target.domain
    }
    this.props.salesSignup(payload)
    .then(() => { 
      if (this.props.userErrors.length === 0) {
        this.props.history.push('/sales/dashboard')
      } else {
        this.props.openSignup({ page: 'response' });
      }
    })
  }

  handleLogin(){
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user)
    .then(() => {
      this.props.history.push('/sales/dashboard')
    })
  }

  retrieveNetworks(){
    const { networkTitle } = this.state;
    // debugger
    this.props.searchNetworks(networkTitle)
  }

  backPage(){
    this.setState({ page: 'login'})
  }

  getContent(){
    const { classes, dimensions, resultNetworks } = this.props;
    const { email, password, networkTitle, page, fname, lname, target } = this.state;

    switch(page){
      case 'signup':
        let signupComp = <Grid item xs={8} sm={6} md={4}container direction='column'>
          <div style={{ marginBottom: 25 }}>
            <Button onClick={this.backPage}>
              {`Back`}
            </Button>
          </div>
          <Typography>
            {`Company: ${target.title}`}
          </Typography>
          <TextField margin='dense'
            required
            label="First Name"
            className={classes.textField}
            variant='outlined'
            value={fname}
            onChange={this.handleChange('fname')}
            onMouseUp={this.handleChange('fname')} />
          <TextField margin='dense'
            required
            label="Last Name"
            className={classes.textField}
            variant='outlined'
            value={lname}
            onChange={this.handleChange('lname')}
            onMouseUp={this.handleChange('lname')} />
          <TextField margin='dense'
            required
            label="Work Email"
            className={classes.textField}
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')} />
          <TextField margin='dense'
            required
            label="Password"
            className={classes.textField}
            variant='outlined'
            value={password}
            type='password'
            onChange={this.handleChange('password')}
            onMouseUp={this.handleChange('password')} />
          <div style={{ marginTop: 20}}>
            <Button color='primary' variant='contained'
            onClick={this.handleSignup}>
              {`Signup`}
            </Button>
          </div>
        </Grid>

        return <Grid item xs={8} container>
          {signupComp}
        </Grid>
      default:
        let loginComp = <Grid container
        style={{ marginBottom: 30}}>
          <Typography style={{ fontWeight: 600}}>
            {`Login`}
          </Typography>
          <Grid container spacing={16}>
            <Grid item xs={6} sm={4}>
              <TextField margin='dense' fullWidth
                required
                label="Work Email"
                className={classes.textField}
                variant='outlined'
                value={email}
                onChange={this.handleChange('email')}
                onMouseUp={this.handleChange('email')}/>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField margin='dense' fullWidth
                required
                label="Password"
                className={classes.textField}
                variant='outlined'
                value={password}
                type='password'
                onChange={this.handleChange('password')}
                onMouseUp={this.handleChange('password')} />
            </Grid>
            <Grid item xs={6} sm={2} container justify='center' alignItems='center'>
              <div>
                <Button color='primary' variant='contained'
                onClick={this.handleLogin}>
                  {`Login`}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        
        let results = Object.values(resultNetworks)

        let findCompany = <Grid container
          style={{ marginTop: 30}}>
          <Typography style={{ fontWeight: 600}}>
            {`Looking to find your company? Enter your company URL below and press find.`}
          </Typography>
          <Grid container spacing={16}>
            <Grid item xs={6} sm={4}>
              <TextField margin='dense' fullWidth
                required
                label="Company Name"
                placeholder='Eg: Bridgekin'
                className={classes.textField}
                variant='outlined'
                value={networkTitle}
                onChange={this.handleChange('networkTitle')}
                onMouseUp={this.handleChange('networkTitle')} />
            </Grid>
            <Grid item xs={6} sm={2} container justify='center' alignItems='center'>
              <div>
                <Button color='primary' variant='contained'
                onClick={this.retrieveNetworks}>
                  {`Find`}
                </Button>
              </div>
            </Grid>
          </Grid>

          {results.length > 0 && <Grid container
          style={{ marginTop: 30}}>
            <Typography color='textSecondary'
            stlye={{ fontWeight: 600}}>
              {`Results`}
            </Typography>
            <Grid container direction='column'>
              {results.map(network => {
                return <Grid item container justify='space-between' 
                className={classes.result}>
                  <Typography color='textSecondary'
                  style={{ fontSize: 14}}>
                    {`${network.title}`}
                  </Typography>
                  <Button variant='contained' color='primary'
                  onClick={this.handlePage(network)}>
                    {`Select`}
                  </Button>
                </Grid>
              })}
            </Grid>
          </Grid>}
        </Grid>

        let divider = <Grid container alignItems='center'>
          <div style={{ flexGrow: 1, borderTop: `1px solid grey`}}/>
          <Typography color='textSecondary' style={{ margin: '0px 10px'}}>
            {`OR`}
          </Typography>
          <div style={{ flexGrow: 1, borderTop: `1px solid grey` }} />
        </Grid>

        return <Grid item xs={8}>
          <Typography fullWidth color='textSecondary'
          style={{ fontSize: 14, marginBottom: 50}}>
            {`Note* We're putting the finishing touches on this project. We'll be launching in the coming weeks! Stay tuned!`}
          </Typography>
          {loginComp}
          {divider}
          {findCompany}
        </Grid>
    }
  }

  render() {
    const { classes, dimensions, searchNetworks } = this.props;
    const { email, password, networkTitle } = this.state;

    
    return (
      <Grid container justify='center' alignItems='center' className={classes.grid}
        style={{ minHeight: dimensions.height }}>
        {this.getContent()}
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesLogin));
