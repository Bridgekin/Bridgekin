import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import FeedContainer from '../feed_container';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid:{
    position: 'relative',
    flexGrow: 1,
    backgroundColor: theme.palette.base2,
    minHeight: window.innerHeight
  },
})

const responseGoogle = (response) => {
  console.log(response);
  debugger
}

class Template extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    let feed = <GoogleLogin
      clientId="353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    return (
      <FeedContainer
        column1={''}
        feed={feed}
        column2={''} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Template));
