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
import { fetchProfileOpportunities } from '../../actions/opportunity_actions';
import ProfileCard from '../account/profile_card';
import OpportunityCardFeed from '../opportunity/opportunity_card_feed';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  userId: ownProps.match.params.userId,
  users: state.users,
  profileOpportunities: state.entities.profileOpportunities,
  opportunities: state.entities.opportunities
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: (userId) => dispatch(fetchProfile(userId)),
  fetchProfileOpportunities: (profileId) => dispatch(fetchProfileOpportunities(profileId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  mobileWaitlist:{
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
})

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      oppsLoaded: false
    }
  }

  componentDidMount(){
    this.props.fetchProfile(this.props.userId)
    .then(() => {
      this.props.fetchProfileOpportunities(this.props.userId)
      .then(() => this.setState({ oppsLoaded: true}))
      this.setState({ loaded: true })
    })
    // this.props.fetchProfileOpportunities()
  }

  render(){
    const { loaded, oppsLoaded } = this.state;
    const { classes, users, userId, waitlistCard,
      profileOpportunities, opportunities} = this.props;

    if (loaded){
      let profile = users[userId];

      let profileOpps = profileOpportunities.length > 0 ?
      profileOpportunities.map(id =>
        <OpportunityCardFeed
          opportunity={opportunities[id]}/>
      ) : (
        <Typography variant="h6" align='left'
          color="textPrimary" className={classes.filterHeader}>
          {`${profile.fname} hasn't shared any opportunities in your mutual
          communities or dirctly with you.`}
        </Typography>
      )

      let opportunityCards = oppsLoaded ? profileOpps : (
        <div style={{ paddingTop: 50 }}>
          <Loading />
        </div>
      )

      return (
        <div style={{ paddingBottom: 30 }}>
          <ProfileCard user={profile} detailed={true}/>
          {opportunityCards}
        </div>
      )
    } else {
      return <div style={{ paddingTop: 50 }}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfilePage));
