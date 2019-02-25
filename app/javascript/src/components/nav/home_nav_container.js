import { connect } from 'react-redux';
import HomeNav from './home_nav';
import { login } from '../../actions/session_actions';

const mapStateToProps = state => ({
  // currentUser: state.users[state.session.id],
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
