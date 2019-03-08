import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ContactCard from './contact_card';
import FeedCard from '../feed_card';
import Loading from '../loading';

import { fetchSearchResults } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  searchInput: ownProps.match.params.input,
  searchResults: state.entities.searchResults,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: (searchInput) => dispatch(fetchSearchResults(searchInput))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class SearchResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.fetchSearchResults(this.props.searchInput)
    .then(() => this.setState({ loaded: true }))
  }

  render(){
    const { loaded } = this.state;
    if (loaded){
      const { searchResults } = this.props;
      let resultCards = searchResults.map(contactId => (
        <FeedCard
          contents={<ContactCard contact={contactId} search={true}/>}
          />
      ))
      return <div>{resultCards}</div>
    } else {
      return <div style={{ paddingTop: 50 }}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchResults));
