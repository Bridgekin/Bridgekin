import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class NotificationCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const { notification } = this.props;
    return <div>{`Notification Card`}</div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotificationCard));
