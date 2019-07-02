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

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
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
      company: '',
      loaded: false
    }

    this.getContent = this.getContent.bind(this);
  }

  componentDidMount(){
    const { code } = this.props; 
    // this.props.fetchAdminSignupLink(code)
    // .then(() => this.setState({ loaded: true}))
  }

  changePage(url){
    return e => {
      this.props.history.push(url)
    }
  }

  getContent(){
    const { page, adminSignupLink, code } = this.props;

    switch(page){
      case "admin":
        let content = <Grid item md={4} sm={7} xs={10}>
          <Paper>
            {`Example`}
          </Paper>
        </Grid>
        return "asdfasdf";
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
