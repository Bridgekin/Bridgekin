import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { fetchDirectLink } from '../../actions/direct_link_actions';
import FeedContainer from '../feed_container';
import ProfileCard from '../account/profile_card';
import OpportunityCardFeed from '../opportunity/opportunity_card_feed';
import Loading from '../loading';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  linkCode: ownProps.match.params.linkCode,
  directLink: state.entities.directLink,
  opportunities: state.entities.opportunities,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  // directLinkModal: state.modals.directLink,
  fetchDirectLink: linkCode => dispatch(fetchDirectLink(linkCode))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class DirectLinkPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    const { linkCode } = this.props;
    this.props.fetchDirectLink(linkCode)
    .then(() => this.setState({ loaded: true }) )
  }

  render(){
    const { opportunities, users, directLink } = this.props;
    const { loaded } = this.state;

    if (directLink.opportunityIds && loaded){
      // debugger
      let profile = users[directLink.profileId];

      let profileOpps = (directLink.opportunityIds.length > 0) ?
      directLink.opportunityIds.map(id =>
        <OpportunityCardFeed
          opportunity={opportunities[id]}/>
      ) : ''

      let feed = <div style={{ paddingBottom: 30 }}>
        <ProfileCard user={profile} detailed={false}/>
        {profileOpps}
      </div>

      return <FeedContainer feed={feed}/>
    } else {
      return <div style={{ paddingTop: 50 }}>
        <Loading />
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DirectLinkPage));
