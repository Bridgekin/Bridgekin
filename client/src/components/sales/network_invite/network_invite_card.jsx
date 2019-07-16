import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

class NetworkInviteCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  handleChange(field){
    return e => {
      const { idx } = this.props;
      let value = e.target.value;
      this.setState({ [field]: value})
      // this.props.updateVariable(`${field}${idx}`)(value)
    }
  }

  fetchData(){
    
  }

  render() {
    const { classes } = this.props;
    const { email, fname, lname } = this.props;
    return <Grid container justify='space-between'>
      <Grid item xs={4}>
        <TextField fullWidth
          label="Email"
          className={classes.textField}
          margin="dense"
          variant='outlined'
          value={email}
          onChange={this.handleChange('email')}
          onMouseUp={this.handleChange('email')}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          label="First Name"
          className={classes.textField}
          margin="dense"
          variant='outlined'
          value={fname}
          onChange={this.handleChange('fname')}
          onMouseUp={this.handleChange('fname')}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth
          label="Last Name"
          className={classes.textField}
          margin="dense"
          variant='outlined'
          value={lname}
          onChange={this.handleChange('lname')}
          onMouseUp={this.handleChange('lname')}
        />
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NetworkInviteCard));
