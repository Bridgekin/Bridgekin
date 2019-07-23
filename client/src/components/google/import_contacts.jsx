import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import BridgekinLogo from '../../static/Bridgekin_Logo.png'
import FeedContainer from '../feed_container';
import Loading from '../loading';
import Img from 'react-image'
// import ContactCard from '../connections/contact_card';
import FeedCard from '../feed_card';
import GoogleLogo from './google-favicon-logo.png';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { fetchGoogleMatchedContacts } from '../../actions/google_import_actions';
import { trackGoogleUploadClick } from '../../actions/sales_contacts_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.entities.connections,
  googleMatchedContacts: state.entities.googleMatchedContacts
});

const mapDispatchToProps = dispatch => ({
  fetchGoogleMatchedContacts: (contacts) => dispatch(fetchGoogleMatchedContacts(contacts)),
  trackGoogleUploadClick: () => dispatch(trackGoogleUploadClick())
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
  feedCard:{
    padding: "10px 8px 12px",
    backgroundColor: `${theme.palette.base3}`,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
      padding: "10px 17px 12px",
    },
  },
  cardHeader: {
    fontSize: 14,
    margin: 15
  },
  googleLogo:{
    marginRight: 10,
    width: 35, height: 35
  },
  customButton:{
    border: `1px solid ${theme.palette.border.secondary}`
  }
})

class GoogleContacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gapiLoaded: false,
      contactsCompared: false,
      isSignedIn: false,
      loginRequestSent: false
    }
    this.scope = 'https://www.googleapis.com/auth/contacts.readonly'

    this.responseGoogle = this.responseGoogle.bind(this);
    this.startGapi = this.startGapi.bind(this);
    this.getAllContactsRequest = this.getAllContactsRequest.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignOut = this.googleSignOut.bind(this);
    this.handleMyTrustedNetwork = this.handleMyTrustedNetwork.bind(this);
    this.handleConnectSocial = this.handleConnectSocial.bind(this);
  }

  componentDidMount(){
    this.loadGoogleApi();
  }

  // componentWillUnmount(){
  //   this.googleSignOut();
  // }

  loadGoogleApi() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => window.gapi.load('client:auth2', this.startGapi);
    document.body.appendChild(script);
  }

  startGapi(){
    window.gapi.client.init({
      'clientId': "353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com",
      'scope': this.scope,
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(() => {
      window.googleAuth = window.gapi.auth2.getAuthInstance();
      window.googleAuth.disconnect();
      // debugger
      this.setState({ gapiLoaded: true})
      // Listen for sign-in state changes.
      window.googleAuth.isSignedIn.listen(this.handleAuthResponse);
      // var user = window.googleAuth.currentUser.get();
      // this.handleAuthResponse()
      // debugger
    });
  }

  googleSignIn(){
    this.props.trackGoogleUploadClick()
    window.googleAuth.signIn();
  }

  googleSignOut(){
    window.googleAuth.disconnect();
  }

  handleAuthResponse(isSignedIn){
    const { connectSocial, asLogin } = this.props;
    const { loginRequestSent } = this.state;
    let user = window.googleAuth.currentUser.get();

    if(connectSocial){
      let isAuthorized = user.hasGrantedScopes(this.scope);
      
      if(isAuthorized && user.Zi){
        let token = user.Zi.access_token
        this.getAllContactsRequest(token)
      }
    } else if (asLogin && !loginRequestSent){
      let author = {
        fname: user.w3.ofa,
        lname: user.w3.wea,
        email: user.w3.U3
      }
      this.props.getLoginInfo(author);
      window.googleAuth.disconnect();
      this.setState({ loginRequestSent: true})
    }
  }

  getAllContactsRequest(token){
    const { asContactCard, asLogin } = this.props;

    window.gapi.client.request({
      'path': `/m8/feeds/contacts/default/full`,
      'method': 'GET',
      'params':{
        'alt':'json',
        'max-results': 5000,
        'orderby': 'lastmodified',
        'sortorder': 'descending'
      },
      'headers':{
        'GData-Version': 3.0,
        'Access Token': token
      }
    }).then((response) => {
      let results = JSON.parse(response.body)
      let contactUsers = results.feed.entry.filter(contact => contact.gd$email)
      .map(contact => ({
        email: contact.gd$email[0].address,
        //Fix this later
        name: contact.title.$t
      }))
      let contactEmails = Object.values(contactUsers).map(user => user.email)

      if(asContactCard){
        this.props.fetchGoogleMatchedContacts(contactEmails)
        .then(() => this.setState({
          contactsCompared: true, contactUsers
        }))
      } else if(asLogin){
        let author = response.result.feed.author[0]
        this.props.getLoginInfo(author);
      } else {
        this.setState({ contactUsers })
      }
    }, (reason) => {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  responseGoogle(response){
    let token = response.accessToken;

    if(token){
      // this.getAllContactsRequest(token)
      let author = {
        fname: response.w3.ofa,
        lname: response.w3.wea,
        email: response.w3.U3
      }
      this.props.getLoginInfo(author);
    }
  }

  handleMyTrustedNetwork(){
    const { currentUser, connections, users,
      googleMatchedContacts } = this.props;
    const { contactUsers } = this.state;

    //Parse Connection Ids for Current User
    let connectionIds = Object.values(connections).map(connection => {
      if (connection.friendId === currentUser.id) {
        return connection.userId
      } else {
        return connection.friendId
      }
    });
    let connectionIdSet = new Set(connectionIds);

    // Get Unconnected Emails
    let usersByEmail = Object.values(users).reduce((acc, user) => {
      acc[user.email] = user
      return acc
    }, {})
    let nonBIDUsers = Object.values(contactUsers).filter(contactUser => (
      !usersByEmail[contactUser.email]
    ))
    let nonBIDCards = nonBIDUsers.map(importedUser => {
      return <FeedCard
        // contents={<ContactCard importedUser={importedUser} imported external />}
      />
    })

    // Separate Bridgekin Ids that aren't already contacts
    let unconnectedBIDs = googleMatchedContacts.filter(userId => (
      !connectionIdSet.has(userId)
    ))
    let unconnectedBIDCards = unconnectedBIDs.map(contactId => (
      <FeedCard
        // contents={<ContactCard contactId={contactId} imported internal />}
      />
    ))
    // debugger
    //Combine and return both lists
    return [...unconnectedBIDCards, ...nonBIDCards]
      // return nonBIDCards
  }

  handleConnectSocial(){
    const { contactUsers } = this.state;

    this.props.receiveGoogleUsers(contactUsers)
    return <Grid container justify='center'>
      <Typography fullWidth
        style={{ fontSize: 14 }}>
        {`Contacts retrieved. Ready for uplo`}
      </Typography>
      <Button
        onClick={this.googleSignOut}>
        {`Sign Out`}
      </Button>
    </Grid>
  }

  getContent(){
    const { classes, asContactCard, 
    googleMatchedContacts, connections, 
    currentUser, users, salesImport,
    connectSocial } = this.props;
    const { contactsCompared, contactUsers } = this.state;

    if (contactsCompared){
      return this.handleMyTrustedNetwork()
    } else if (contactUsers){
      return this.handleConnectSocial()
    } else {
      if(asContactCard){
        return <GoogleLogin
          clientId="353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com"
          render={renderProps => {
            return <FeedCard
              contents={
              renderProps.disabled ? <Loading /> : (
                <Grid data-cy='import-google-button's
                  justify='center' alignItems='center'
                  onClick={renderProps.onClick}>
                  <Typography color='textSecondary' align='center'
                    style={{ fontSize: 13}}>
                    {`Sign in with Google to see which of your contacts are on Bridgekin`}
                  </Typography>
                </Grid>)
            } />
          }}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          />
      } else {
        return <Button onClick={this.googleSignIn}
        className={classes.customButton}>
          <Img src={GoogleLogo}
          className={classes.googleLogo}/>
          <Typography color='textSecondary'
          style={{ fontSize: 14, textTransform:'none'}}>
            {connectSocial ? `Sign In` : "Signup/Signin"}
          </Typography>
        </Button>
      }
      // } else {
      //   return <GoogleLogin
      //     data-cy='import-google-button'
      //     clientId="353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com"
      //     buttonText="Signup/Signin"
      //     onSuccess={this.responseGoogle}
      //     onFailure={this.responseGoogle}
      //     cookiePolicy={'single_host_origin'}
      //     />
      // }
    }
  }

  render(){
    const { gapiLoaded } = this.state;

    if (gapiLoaded){
      return this.getContent();
    } else {
      return <Loading />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GoogleContacts));
