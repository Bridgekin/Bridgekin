import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { fetchNotificationSettings, updateNotificationSetting }
  from '../../actions/notification_setting_actions';

import FeedCard from '../feed_card';
import Loading from '../loading';
import merge from 'lodash/merge';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  notificationSettings: state.entities.notificationSettings
});

const mapDispatchToProps = dispatch => ({
  fetchNotificationSettings: () => dispatch(fetchNotificationSettings()),
  updateNotificationSetting: (notificationSetting) => dispatch(updateNotificationSetting(notificationSetting)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  notificationHeader:{ fontSize: 13, fontWeight: 600},
  notificationItem: { fontSize: 13, fontWeight: 400},
  // switchIcon: {backgroundColor: 'white'},
  // switchBar: { backgroundColor: 'black'}
})

class NotificationSettings extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      sending: false,
      changed: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchNotificationSettings()
    .then(() => {
      this.setState(merge({}, {loaded: true},
        this.props.notificationSettings))
    })
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.checked, changed: true})
    }
  }

  handleMenuClick(anchor){
    return e => {
      const anchorEl = this.state[anchor];
      this.setState({ [anchor]: anchorEl ? null : e.currentTarget})
    }
  }

  handleMenuChange(option, cadence){
    return e => {
      e.stopPropagation();
      this.setState({
        [option.value]: cadence,
        [option.anchor]: null,
      })
    }
  }

  handleSubmit(e){
    e.stopPropagation();
    const { oppsSharedDirect, oppsSharedContacts, oppsSharedCommunities,
      invitesRequested, emailOppsSharedDirect, emailInvitesRequested,
      emailOppsSharedContacts, emailOppsSharedCommunities } = this.state;

    let notificationSetting = {
      oppsSharedDirect, oppsSharedContacts, oppsSharedCommunities,
      invitesRequested, emailOppsSharedDirect, emailInvitesRequested,
      emailOppsSharedContacts, emailOppsSharedCommunities
    }

    this.setState({ sending: true },
    () => {
      this.props.updateNotificationSetting(notificationSetting)
      .then(() => this.setState({ sending: false, changed: false }))
    })
  }

  render(){
    const { classes } = this.props;
    const { loaded, sending, changed } = this.state;

    if (loaded){
      let inAppOptions = [
        {value: 'oppsSharedDirect', string: 'Opportunities sent to you directly'},
        {value: 'oppsSharedContacts', string: 'Opportunities posted by your contacts'},
        {value: 'oppsSharedCommunities', string: 'Opportunities posted within you communities'},
        {value: 'invitesRequested', string: 'Invitation requests'}
      ]
      let emailSwitchOptions = [
        {value: 'emailOppsSharedDirect', string: 'When a user sends you an opportunity directly'},
        {value: 'emailInvitesRequested', string: 'Invitation requests'}
      ]
      let emailSelectOptions = [
        {value: 'emailOppsSharedContacts', anchor: `contactsAnchorEl`,string: 'Opportunities posted by your contacts'},
        {value: 'emailOppsSharedCommunities', anchor: `communitiesAnchorEl`, string: 'Opportunities posted within you communities'}
      ]
      let cadence = ['Weekly', 'Monthly', 'Never']

      let notificationCard = (
        <div>
          <Grid container>
            <Grid item xs={12} >
              <Typography align='left' color='textPrimary'
                className={classes.notificationHeader}>
                {`In-App Notifications`}
              </Typography>
            </Grid>

            {inAppOptions.map(option => (
              <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={10}>
                  <Typography align='left' color='textPrimary'
                    className={classes.notificationItem}>
                    {option.string}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Switch
                    checked={this.state[option.value]}
                    onChange={this.handleChange(option.value)}
                    color="primary"
                    style={{ height: 32}}
                    classes={{
                      icon: classes.switchIcon,
                      bar: classes.switchBar
                    }}
                    />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid container style={{ marginTop: 30}}>
            <Grid item xs={12} >
              <Typography align='left' color='textPrimary'
                className={classes.notificationHeader}>
                {`Email Notifications`}
              </Typography>
            </Grid>

            {emailSwitchOptions.map(option => (
              <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={10}>
                  <Typography align='left' color='textPrimary'
                    className={classes.notificationItem}>
                    {option.string}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Switch
                    checked={this.state[option.value]}
                    onChange={this.handleChange(option.value)}
                    color="primary"
                    style={{ height: 32}}
                    />
                </Grid>
              </Grid>
            ))}

            {emailSelectOptions.map(option => (
              <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={10}>
                  <Typography align='left' color='textPrimary'
                    className={classes.notificationItem}>
                    {option.string}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button style={{ textTransform: 'capitalize'}}
                    onClick={this.handleMenuClick(option.anchor)}>
                    {this.state[option.value] }
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state[option.anchor]}
                    open={Boolean(this.state[option.anchor])}
                    onClose={this.handleMenuClick(option.anchor)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    getContentAnchorEl={null}
                    >
                    {cadence.map(cad => (
                      <MenuItem onClick={this.handleMenuChange(option, cad)}
                        value={cad}>
                        {cad}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid container justify='flex-end'
            style={{ marginTop: 20 }}>
            <Button variant='contained' color='primary'
              disabled={!changed || sending} onClick={this.handleSubmit}>
              Save
            </Button>
          </Grid>
        </div>
      )
      return (
        <FeedCard contents={notificationCard} />
      )
    } else {
      return <Loading />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotificationSettings));
