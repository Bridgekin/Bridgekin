import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  inviteRow:{
    border: `1px solid #fafafa`,
    borderRadius: 10,
    padding: 5
  }
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
      const { data } = this.props;
      let value = e.target.value;
      // this.setState({ [field]: value})
      this.props.updateVariable({id: data.id, field: field, value: value })
    }
  }

  render() {
    const { classes, data } = this.props;
    // const { email, fname, lname } = this.props;
    return <Grid container justify='space-between'
      data-cy='network-invite-card'
      spacing={1} className={classes.inviteRow}>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth
          data-cy='invite-email-input'
          label="Email"
          className={classes.textField}
          margin="dense"
          variant='outlined'
          value={data.email}
          onChange={this.handleChange('email')}
          onMouseUp={this.handleChange('email')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth
          data-cy='invite-fname-input'
          label="First Name"
          className={classes.textField}
          margin="dense"
          variant='outlined'
          value={data.fname}
          onChange={this.handleChange('fname')}
          onMouseUp={this.handleChange('fname')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth
          data-cy='invite-lname-input'
          label="Last Name"
          className={classes.textField}
          margin="dense"
          variant='outlined'
          value={data.lname}
          onChange={this.handleChange('lname')}
          onMouseUp={this.handleChange('lname')}
        />
      </Grid>
      <Grid item xs={2} container alignItems='center'>
        <Select fullWidth
          data-cy='invite-member_type'
          value={data.relationship}
          onClick={(e) => e.stopPropagation()}
          onChange={this.handleChange('relationship')}>
          <MenuItem data-cy='rel-both'
            value={'both'}>{`Request and grant access`}
          </MenuItem>
          <MenuItem data-cy='rel-request'
          value={'request'}>{`Request Access`}</MenuItem>
          <MenuItem data-cy='rel-give'
            value={'give'}>{`Grant Access`}</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={1} container alignItems='center'>
        <IconButton onClick={() => this.props.deleteUser(data.id)}>
          <RemoveCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NetworkInviteCard));
