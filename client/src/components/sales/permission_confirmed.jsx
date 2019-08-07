import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import queryString from 'query-string';

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  relationship: values.rel
}};

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class PermissionConfirmed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getPhrase = this.getPhrase.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(){
    const { currentUser } = this.props;

    if (currentUser){
      this.props.history.push('/sales/dashboard')
    } else {
      this.props.history.push('/sales/login')
    }
  }

  getPhrase(){
    const { relationship } = this.props;
    // NOTE** This is confusing since the relationship is from the perspective of the person requesting this information. So, if it says request, then this confirmation is to grant acces that is being requested
    switch (relationship){
      case "request":
        return "You have now granted access to your contacts.";
      case "grant":
        return "You have now gained access to this network or user's contacts";
      default:
        return "You have now both granted access to your contacts and gained access to this network or user's contacts";
    }
  }

  render() {
    const { dimensions, currentUser } = this.props;

    let phrase = this.getPhrase()

    return <Grid container justify='center' alignItems='center' style={{ minHeight: dimensions.height }}>
      <Grid item xs={10} sm={6}>
        <Typography align='center' gutterBottom
          data-cy="progress-header"
          color='textPrimary'
          style={{ fontSize: 38, fontWeight: 600 }}>
          {`Permission Confirmed`}
        </Typography>
        <Typography align='center' gutterBottom
          color='textSecondary'
          style={{ fontSize: 18 }}>
          {`Great job! ${phrase}`}
        </Typography>
        <Typography align='center'
          color='textSecondary'
          style={{ fontSize: 18 }}>
          {`If you have any questions, reach out to us at `}
          <a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a> {`.`}
        </Typography>
        <Grid container justify='center'
        style={{ marginTop: 50}}>
          <Button variant='contained' color='primary'
          onClick={this.handleRedirect}>
            {currentUser ? `Back to Dashboard` : `Back to login`}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PermissionConfirmed));
