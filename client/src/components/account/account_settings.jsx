import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import blankProfilePic from '../../static/blank_profile_pic.png';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import UpdateUserModal from './update_user_modal';
// import countryList from 'react-select-country-list';
import countryList from 'country-list';

import { fetchEmailNotification, createEmailNotification }
  from '../../actions/email_notification_actions';
import { updateUser } from '../../actions/user_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  notification: state.entities.emailNotification,
  userErrors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
  fetchEmailNotification: () => dispatch(fetchEmailNotification()),
  createEmailNotification: (notification) => dispatch(createEmailNotification(notification)),
  updateUser: user => dispatch(updateUser(user))
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  pic: {
    width: 325,
    height: 325
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  cardSection:{
    marginTop: 10
  },
  content:{
    marginLeft: 20,
    width: '50%'
  },
  passwordContent:{
    margin: '0 auto',
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 25
  },
  cardEditIcon:{
    color: "#d3d3d3",
    fontSize: 20
  },
  button: { margin: "5px 0px 5px 0px" },
  submitButton: { margin: "20px 20px 0px 20px" },
  buttonWrapper:{
    display: 'flex',
    justifyContent: 'center'
  },
  textFieldWrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectLabel:{
    marginTop: 15
  },
  fieldLabel:{
    marginTop: 15
  }
});


class AccountSetting extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notificationSetting: 'Never',
      settingState: "Home",
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
      modalOpen: false,
      fname: this.props.currentUser.fname,
      lname: this.props.currentUser.lname,
      title: this.props.currentUser.title,
      company: this.props.currentUser.company,
      city: this.props.currentUser.city,
      state: this.props.currentUser.state,
      country: countryList.getName(this.props.currentUser.country) || ''
    }

    this.options = Object.values(countryList.getNames());
    // this.options = countryList().getData()

    this.changePassword = this.changePassword.bind(this);
    this.changeGeneralInformation = this.changeGeneralInformation.bind(this);
  }

  componentDidMount(){
    this.props.fetchEmailNotification()
    .then(() => {
      this.setState({ notificationSetting: this.props.notification.notificationSetting })
    })
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  handleNotificationChange = event => {
    let notificationSetting = event.target.value;
    this.props.createEmailNotification({ notificationSetting })
    .then(() => {
      this.setState({ notificationSetting });
    })
  }

  handleChangeFill(settingState){
    return () => {
      debugger
      this.setState({ settingState })
    }
  }

  handleInfoChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleModalClose = () => {
    // debugger
    if(this.props.userErrors.length > 0){
      this.setState({ modalOpen: false })
    } else {
      this.setState({
        modalOpen: false,
        settingState: "Home",
        currentPassword: '',
        password: '',
        passwordConfirmation: '',
        fname: this.props.currentUser.fname,
        lname: this.props.currentUser.lname,
        title: this.props.currentUser.title,
        company: this.props.currentUser.company,
        city: this.props.currentUser.city,
        state: this.props.currentUser.state,
        country: countryList.getName(this.props.currentUser.country) || ''
      })
    }
  };

  changePassword(){
    const { password, passwordConfirmation, currentPassword} = this.state;
    let user = {
      id: this.props.currentUser.id,
      password,
      passwordConfirmation,
      currentPassword
    }
    this.props.updateUser(user)
    .then(()=> this.setState({ modalOpen: true }))
  }

  changeGeneralInformation(){
    let { fname, lname, city, state, country, title, company} = this.state;

    country = countryList.getCode(country);
    let user = {
      id: this.props.currentUser.id,
      fname, lname, city, state, country, title, company
    }
    this.props.updateUser(user)
    .then(()=> this.setState({ modalOpen: true }))
  }

  getContent(){
    const { classes, currentUser }= this.props;
    const { settingState, modalOpen } = this.state;
    // debugger
    switch (settingState) {
      case "Home":
        return (
          <Card className={classes.card}>
            <CardMedia
              className={classes.pic}
              image={blankProfilePic}
              title="Account Profile Picture"
            />
            <CardContent className={classes.content}>
              <div className={classes.wrapper}>
                <Typography variant="h4" color="secondary"
                  align='left'>
                  {`${this.capitalize(currentUser.fname)} ${this.capitalize(currentUser.lname)}`}
                </Typography>
                <div style={{ marginLeft: 10 }}
                  onClick={() => this.props.history.push('/account/settings')}>
                  <i className={["far fa-edit", classes.cardEditIcon].join(' ')}/>
                </div>
              </div>

              <Typography variant="h7" align='left'
                color="secondary" >
                Contact Information
              </Typography>
              <Typography variant="h6" gutterBottom align='left'
                color="default">
                {currentUser.email}
              </Typography>

              <Button color="secondary" className={classes.button}
                onClick={this.handleChangeFill('General Information')}>
                Change your profile information
              </Button>

              <Button color="secondary" className={classes.button}
                onClick={this.handleChangeFill('Reset Password')}>
                Change your password
              </Button>

              <Typography variant="h7" align='left'
                color="secondary" >
                {`How often would you like to be notified about
                  opportunities by email?`}
              </Typography>

              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="Notifications"
                  name="notifications"
                  className={classes.group}
                  value={this.state.notificationSetting}
                  onChange={this.handleNotificationChange}
                >
                  <FormControlLabel value="Weekly" control={<Radio />} label="Weekly Email Recap" />
                  <FormControlLabel value="Never" control={<Radio />} label="Never - I am immune to FOMO" />
                </RadioGroup>
              </FormControl>

            </CardContent>
          </Card>
        );
      case "Reset Password":
        return(
          <Card className={classes.card}>
            <CardContent className={classes.passwordContent}>
              <Typography variant="h5" align='left'
                color="secondary" gutterBottom>
                Reset Password Below
              </Typography>
              <TextField
                id="standard-password-input"
                label="Current Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={this.handleInfoChange('currentPassword')}
              />
              <TextField
                id="standard-password-input"
                label="New Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={this.handleInfoChange('password')}
              />
              <TextField
                id="standard-password-input"
                label="Password Confirmation"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={this.handleInfoChange('passwordConfirmation')}
              />
              <div className={classes.buttonWrapper}>
                <Button className={classes.submitButton}
                  onClick={this.handleChangeFill('Home')} variant='contained'>
                  Back
                </Button>

                <Button color="secondary" className={classes.submitButton}
                  onClick={this.changePassword} variant='contained'>
                  Change Password
                </Button>
              </div>
            </CardContent>

            <UpdateUserModal
              open={modalOpen}
              modalType={'password'}
              handleClose={this.handleModalClose}/>
          </Card>
        );
      case "General Information":
        let countryOptions = this.options.map(option =>(
          <MenuItem value={option}>{option}</MenuItem>
        ));
        return(
          <Card className={classes.card}>
            <CardContent className={classes.passwordContent}>
              <Typography variant="h5" align='left'
                color="secondary" gutterBottom>
                Change your profile information
              </Typography>
              <Typography variant="h6" align='left'
                color="secondary" className={classes.fieldLabel}>
                Name
              </Typography>
              <div className={classes.textFieldWrapper}>
                <TextField
                  id="standard-name"
                  label="First Name"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.fname}
                  onChange={this.handleInfoChange('fname')}
                  />
                <TextField
                  id="standard-name"
                  label="Last Name"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.lname}
                  onChange={this.handleInfoChange('lname')}
                  />
              </div>

              <Typography variant="h6" align='left'
                color="secondary" className={classes.fieldLabel}>
                Position
              </Typography>
              <TextField
                id="standard-name"
                label="Title"
                className={classes.textField}
                margin="normal"
                value={this.state.title}
                onChange={this.handleInfoChange('title')}
              />
              <TextField
                id="standard-name"
                label="Company"
                className={classes.textField}
                margin="normal"
                value={this.state.company}
                onChange={this.handleInfoChange('company')}
              />

              <Typography variant="h6" align='left'
                color="secondary" className={classes.fieldLabel}>
                Location
              </Typography>
              <TextField
                id="standard-name"
                label="City"
                className={classes.textField}
                margin="normal"
                value={this.state.city}
                onChange={this.handleInfoChange('city')}
              />
              <InputLabel htmlFor="country-simple"
                className={classes.selectLabel}>Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.handleInfoChange('country')}
                inputProps={{
                  name: 'country',
                  id: 'country-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countryOptions}
              </Select>

              <div className={classes.buttonWrapper}>
                <Button className={classes.submitButton}
                  onClick={this.handleChangeFill('Home')} variant='contained'>
                  Back
                </Button>

                <Button color="secondary" className={classes.submitButton}
                  onClick={this.changeGeneralInformation} variant='contained'>
                  Change Information
                </Button>
              </div>
            </CardContent>

            <UpdateUserModal
              open={modalOpen}
              modalType={'general'}
              handleClose={this.handleModalClose}/>
          </Card>
        );
      default:
        return (<div></div>)
    }
  }

  render(){
    const { classes }= this.props;
    const { options }= this.state;
    debugger
    // <Typography variant="h7" align='left'
    //   color="secondary" >
    //   Current Password
    // </Typography>
    // <Typography variant="h6" gutterBottom align='left'
    //   color="default">
    //   {'*********'}
    // </Typography>

    return (
      <Grid container justify="center" alignItems="center"
        spacing={24} className={classes.root}>
        <Grid item xs={10} md={7} className={classes.homeContainer}>
          {this.getContent()}
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountSetting));
