import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Loading from '../loading';
import FeedCard from '../feed_card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { fetchProfile } from '../../actions/user_actions';
import ProfileCard from '../account/profile_card';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  userId: ownProps.match.params.userId,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: (userId) => dispatch(fetchProfile(userId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.fetchProfile(this.props.userId)
    .then(() => this.setState({ loaded: true }))
  }

  render(){
    const { loaded } = this.state;
    const { users, userId } = this.props;

    if (loaded){
      return (
        <ProfileCard user={users[userId]}/>
      )
    } else {
      return <div style={{ paddingTop: 50 }}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfilePage));
