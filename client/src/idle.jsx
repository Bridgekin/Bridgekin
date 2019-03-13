import React from 'react';
import { connect } from 'react-redux';
import Idle from 'react-idle';

import { logout } from './actions/session_actions';
import ReactNotification from "react-notifications-component";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

class IdleWatcher extends React.Component {
  constructor(props) {
    super(props);

    this.handleIdle = this.handleIdle.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "You've gone idle",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  handleIdle({idle}){
    if(idle){
      console.log('you are now idle');
      // this.addNotification();

      this.idleTimer = setTimeout(() => {
        // this.props.logout();
      },3000)

    } else {
      clearTimeout(this.idleTimer);
    }
  }

  render() {
    const { currentUser } = this.props;
    if(currentUser){
      return (
        <div>
          <ReactNotification ref={this.notificationDOMRef}/>
          <Idle timeout={3000}
            onChange={this.handleIdle}
            />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdleWatcher);
