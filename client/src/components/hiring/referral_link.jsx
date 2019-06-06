import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import copy from 'copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  refLink: state.entities.hiring.refLink
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class ReferralLink extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      linkCode: '',
      copied: false,
    }

    this.getLink = this.getLink.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy(link){
    return e => {
      copy(link);
      this.setState({ copied: true })
    }
  }

  getLink(){
    const { refLink, refOppId } = this.props;
    if(!refOppId){
      return 'Set on posting creation...'
    } else {
      if(Object.keys(refLink).length > 0){
        return `${window.location.origin}/hiring/show/${refOppId}?referralCode=${refLink.linkCode}`
      } else {
        return 'Loading'
      }
    }
  }

  render(){
    const { refOppId, show } = this.props;
    const { copied } = this.state;

    let link = this.getLink();

    let shareLink= <Grid style={{ marginBottom: 30}}>
      <Typography color='textPrimary' gutterBottom
      fullWidth
      style={{ fontSize: 18}}>
        {`Your Referral Rewards`}
      </Typography>

      <Typography color='textSecondary' gutterBottom
      fullWidth style={{ fontSize: 14 }}>
        <i>{link}</i>
      </Typography>
      <Grid item xs={12}
      style={{ marginTop: 10}}>
        <Button color='primary' variant='contained'
        onClick={this.handleCopy(link)}>
          {copied ? `Copied` : `Copy`}
        </Button>
      </Grid>
    </Grid>

    let shareExternal = <Grid container style={{ marginBottom: 30}}>
      {show && <Typography color='textPrimary' gutterBottom
      fullWidth
      style={{ fontSize: 18}}>
        {`Share Referral link to your network`}
      </Typography>}
      <Grid container justify='space-around'
      item xs={8}>
        <SocialIcon network="email"
        url="mailto:mail@example.org"/>
        <SocialIcon url="http://linkedin.com/" 
        network="linkedin"/>
        <SocialIcon url="http://facebook.com/" 
        network="facebook"/>
        <SocialIcon url="http://twitter.com/" network="twitter"/>
      </Grid>
    </Grid>


    return <div style={{ flexGrow: 1}}>
      {shareLink}
      {shareExternal}
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReferralLink));
