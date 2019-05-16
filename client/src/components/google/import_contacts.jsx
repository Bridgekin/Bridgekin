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
import ContactCard from '../connections/contact_card';
import FeedCard from '../feed_card';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { fetchGoogleMatchedContacts } from '../../actions/google_import_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connections: state.entities.connections,
  googleMatchedContacts: state.entities.googleMatchedContacts
});

const mapDispatchToProps = dispatch => ({
  fetchGoogleMatchedContacts: (contacts) => dispatch(fetchGoogleMatchedContacts(contacts))
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
  }
})

class GoogleContacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gapiLoaded: true,
      contactsCompared: false
    }
    this.responseGoogle = this.responseGoogle.bind(this);
    this.startGapi = this.startGapi.bind(this);
    this.getAllContactsRequest = this.getAllContactsRequest.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount(){
    this.loadGoogleApi();
  }

  loadGoogleApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => window.gapi.load('client', this.startGapi);
    document.body.appendChild(script);
  }

  startGapi(){
    window.gapi.client.init({
      'clientId': "353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com",
      'scope': 'https://www.googleapis.com/auth/contacts.readonly',
    }).then(() => { this.setState({ gapiLoaded: true })})
  }

  getAllContactsRequest(token){
    window.gapi.client.request({
      'path': `/m8/feeds/contacts/default/full`,
      'method': 'GET',
      'params':{
        'alt':'json',
        'max-results': 150,
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
      this.props.fetchGoogleMatchedContacts(contactEmails)
      .then(() => this.setState({
        contactsCompared: true, contactUsers
      }))
    }, (reason) => {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  responseGoogle(response){
    let token = response.accessToken;
    // let email = response.w3.U3;
    this.getAllContactsRequest(token)
  }

  getContent(){
    const { classes, asContactCard, googleMatchedContacts,
      connections, currentUser, users} = this.props;
    const { contactsCompared, contactUsers } = this.state;

    if (contactsCompared){
      //Parse Connection Ids for Current User
      let connectionIds = Object.values(connections).map(connection => {
        if (connection.friendId === currentUser.id){
          return connection.userId
        } else {
          return connection.friendId
        }
      });
      let connectionIdSet = new Set(connectionIds);

      // Get Unconnected Emails
      let usersByEmail = Object.values(users).reduce((acc,user) => {
        acc[user.email] = user
        return acc
      },{})
      let nonBIDUsers = Object.values(contactUsers).filter(contactUser => (
        !usersByEmail[contactUser.email]
      ))
      let nonBIDCards = nonBIDUsers.map(importedUser => {
        return <FeedCard
          contents={<ContactCard importedUser={importedUser} imported external/>}
          />
      })

      // Separate Bridgekin Ids that aren't already contacts
      let unconnectedBIDs = googleMatchedContacts.filter(userId => (
        !connectionIdSet.has(userId)
      ))
      let unconnectedBIDCards = unconnectedBIDs.map(contactId => (
        <FeedCard
          contents={<ContactCard contactId={contactId} imported internal/>}
          />
      ))
      // debugger
      //Combine and return both lists
      return [...unconnectedBIDCards, ...nonBIDCards]
      // return nonBIDCards
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
        return <GoogleLogin
          data-cy='import-google-button'
          clientId="353914730270-5khisbclif4gqall7nta62fie8b9silk.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          />
      }
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
