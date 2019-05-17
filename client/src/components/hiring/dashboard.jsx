import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HiringContainer from './hiring_container';

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

class HiringDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const { classes } = this.props;
    let content = <Grid item xs={10} sm={8}>
        <Typography align='center' color='textPrimary'
          gutterBottom
          style={{ fontSize: 20, fontWeight: 600, marginTop: 20}}>
          {`Manage Your Active Referral Links here`}
        </Typography>
        <Typography align='center' color='textPrimary'
          gutterBottom
          style={{ fontSize: 14, marginBottom: 20}}>
          {`Drive more traffic to your postings by Angel List postings`}
        </Typography>
        <Button fullWidth color='primary' 
        onClick={() => this.props.history.push('/hiring_change')}>
            {`Add An Opportunity`}
        </Button>
    </Grid>
    return <HiringContainer content={content} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringDashboard));
