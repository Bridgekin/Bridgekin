import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import FeedContainer from '../feed_container';
import Loading from '../loading';

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

const GAPIKEY = 'AIzaSyAhrfyh8VvXWL1oxD6Ngj6rbaxV450W8Do'

const fetchContactData = (userEmail) => {
  fetch(`https://www.google.com/m8/feeds/contacts/${userEmail}/full`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
}

class GoogleContacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gapiLoaded: false
    }
    this.responseGoogle = this.responseGoogle.bind(this);
    this.startGapi = this.startGapi.bind(this);
  }

  componentDidMount(){
    this.loadGoogleApi();
  }

  responseGoogle(response){
    console.log(response);
    let token = response.accessToken;
    let email = response.w3.U3;
    debugger
    this.getAllContactsRequest(token, email)
  }

  getAllContactsRequest(token, email){
    window.gapi.client.request({
      'path': `https://www.google.com/m8/feeds/contacts/${email}/full`,
      'method': 'GET',
      'headers':{
        'GData-Version': 3.0,
        'Access Token': token
      }
      // 'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    }).then(function(response) {
      console.log("response is: ", response.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  startGapi(){
    // window.gapi.client.setApiKey(API_KEY);
    // window.gapi.client.load('youtube', 'v3', () => {
    //   this.setState({ gapiReady: true });
    // });
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': GAPIKEY,
      // clientId and scope are optional if auth is not required.
      'clientId': "353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com",
      'scope': 'https://www.googleapis.com/auth/contacts.readonly',
      // 'scope': 'profile'
    }).then(() => { this.setState({ gapiLoaded: true })})
  }

  loadGoogleApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => window.gapi.load('client', this.startGapi);
    document.body.appendChild(script);
  }

  render(){
    const { gapiLoaded } = this.state;
    let feed = ''

    if (gapiLoaded){
      let feed = <GoogleLogin
        clientId="353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      return (
        <FeedContainer
          column1={''}
          feed={feed}
          column2={''} />
      )
    } else {
      return <Loading />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GoogleContacts));
