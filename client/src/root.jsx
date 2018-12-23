import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { getAuthUserId } from './util/session_api_util';
import { receiveCurrentUser } from './actions/session_actions';
import { connect } from 'react-redux';
import App from './App';

class Root extends React.Component{
  componentDidMount(){
    let token = localStorage.getItem('bridgekinToken');

    if (token){
      getAuthUserId(token)
      .then((user)=> {
        this.props.receiveCurrentUser(user);
      })
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
