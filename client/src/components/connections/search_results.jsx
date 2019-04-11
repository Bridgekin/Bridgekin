import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ContactCard from './contact_card';
import FeedCard from '../feed_card';
import Loading from '../loading';

import OpportunityWaitlist from '../opportunity/opportunity_waitlist';
import { fetchSearchResults } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  searchInput: ownProps.match.params.input,
  searchResultsPage: state.entities.searchResultsPage,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: (searchInput, bool) => dispatch(fetchSearchResults(searchInput, bool))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  mobileWaitlist:{
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
})

class SearchResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.fetchSearchResults(this.props.searchInput, false)
    .then(() => this.setState({ loaded: true }))
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.searchInput !== this.props.searchInput){
      this.setState({ loaded: false},
      () => {
        this.props.fetchSearchResults(nextProps.searchInput, false)
        .then(() => this.setState({ loaded: true }))
      })
    }

    return true
  }

  getContent(){
    const { waitlistContents, classes } = this.props;
    const { searchResultsPage, currentUser } = this.props;

    if (searchResultsPage.length > 0){
      let resultCards = searchResultsPage.map(contactId => (
        <FeedCard
          contents={<ContactCard contact={contactId} search={true}/>}
          />
      ))
      return <div style={{ paddingBottom: 30}}>
        <FeedCard contents={
          <Typography align='left' color='textSecondary'
            style={{ fontSize: 16 }}>
            {`Search Results (${searchResultsPage.length})`}
          </Typography>
        } />
        {resultCards}
      </div>
    } else {
      return <FeedCard contents={
          <div style={{ padding: 30}}>
            <Typography variant="h3" gutterBottom
              color="textSecondary" align='left'
              style={{ fontSize: 24, fontWeight: 600}}>
              {`No Results Found`}
            </Typography>
            <Typography variant="bod1" gutterBottom
              color="textPrimary" align='left'
              style={{ fontSize: 12, margin: "20px 0px" }}>
              {`Looking for someone not yet on Bridgekin?  You have 3 invitations for your trusted business contacts.`}
            </Typography>
            <OpportunityWaitlist
              currentUser={currentUser}
              largeForSearch/>
          </div>
        } />
    }
  }

  render(){
    const { loaded } = this.state;

    if (loaded){
      return this.getContent()
    } else {
      return <div style={{ paddingTop: 50 }}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchResults));
