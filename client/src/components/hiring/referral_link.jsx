import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

class ReferralLink extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      linkCode: ''
    }
  }

  componentDidMount(){
    //Generate Link
    // this.props.generateLink(this.props.id)
    // .then((linkCode) => this.setState({ linkCode })
  }

  render(){
    const { refOppId } = this.props;

    return <Grid style={{ marginBottom: 30}}>
    <Typography color='textPrimary' gutterBottom
    fullWidth
    style={{ fontSize: 18}}>
      {`Your Referral Rewards`}
    </Typography>

    <Typography color='textSecondary' gutterBottom
    fullWidth style={{ fontSize: 14 }}>
      <i>{refOppId ?'Set on posting creation...': 'bridgekin.com/hiring/HGJKFK42'}</i>
    </Typography>
  </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReferralLink));
