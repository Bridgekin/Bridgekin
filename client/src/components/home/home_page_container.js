import { connect } from 'react-redux';
import HomePage from './home_page';
// import { createSearch } from '../actions/search_actions'

const mapStateToProps = state => ({
  // currentUser: state.users[state.session.id],
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  // createSearch: search => dispatch(createSearch(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
