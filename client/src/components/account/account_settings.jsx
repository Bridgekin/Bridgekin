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
import AddIcon from '@material-ui/icons/AddSharp';

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
    width: '100%',
    height: 217,
  },
  addProfilePicIcon:{
    width: '100%',
    height: 217,
    backgroundColor: theme.palette.lightGrey,
    color: theme.palette.grey1
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 30
  },
  cardSection:{
    marginTop: 10
  },
  content:{
    margin: "0px 20px",
    paddingTop: 0,
    paddingBottom: 0
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
  },
  iconWrapper:{
    backgroundColor: theme.palette.grey1
  },
  countryWrapper:{
    display: 'flex',
    flexDirection: 'column'
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
      this.setState({ settingState })
    }
  }

  handleInfoChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleModalClose = () => {
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

    let profilePic = currentUser.profilePic ? (
      <CardMedia
        className={classes.pic}
        image={blankProfilePic}
        title="Account Profile Picture"
      />
    ) : (
      <AddIcon
        className={classes.addProfilePicIcon}/>
    )
    // <CardMedia
    //   className={classes.pic}
    //   title="Add Profile Picture" >
    //   <AddIcon />
    // </CardMedia>

    //Original Edit icon button
    // <div style={{ marginLeft: 10 }}
    //   onClick={() => this.props.history.push('/account/settings')}>
    //   <i className={["far fa-edit", classes.cardEditIcon].join(' ')}/>
    // </div>

    switch (settingState) {
      case "Home":
        return (
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center"
              spacing={16}>

              <Grid item xs={8} md={3}>
                {profilePic}
              </Grid>

              <Grid item xs={8} md={6} className={classes.content}>
                <div className={classes.wrapper}>
                  <Typography variant="h1" align='left'>
                    {`${currentUser.fname} ${currentUser.lname}`.toUpperCase()}
                  </Typography>
                </div>

                <Typography variant="h6" align='left' color='textPrimary'>
                  Contact Information
                </Typography>
                <Typography variant="body1" gutterBottom align='left'
                  color="default" style={{ marginBottom: 15}}>
                  {currentUser.email}
                </Typography>

                <Button color="secondary" className={classes.button}
                  onClick={this.handleChangeFill('General Information')}>
                  <Typography variant="subtitle1" align='left' color='textPrimary'>
                    Change your profile information
                  </Typography>
                </Button>

                <Button color="secondary" className={classes.button}
                  onClick={this.handleChangeFill('Reset Password')}>
                  <Typography variant="subtitle1" align='left' color='textPrimary'>
                    Change your password
                  </Typography>
                </Button>

                <Typography variant="subtitle1" align='left'
                  color="secondary" style={{ marginTop: 15}}>
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
              </Grid>
            </Grid>
          </Card>
        );
      case "Reset Password":
        return(
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center"
              spacing={16}>

              <Grid item xs={8} sm={6} container
                justify="center" alignItems="center">
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
                  fullWidth
                  onChange={this.handleInfoChange('currentPassword')}
                  />
                <TextField
                  id="standard-password-input"
                  label="New Password"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  onChange={this.handleInfoChange('password')}
                  />
                <TextField
                  id="standard-password-input"
                  label="Password Confirmation"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
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
              </Grid>
            </Grid>

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
            <Grid container justify="center" alignItems="center"
              spacing={16}>

              <Grid item xs={10} sm={8}>
                <Typography variant="h5" align='left'
                  color="secondary" gutterBottom
                  style={{marginBottom: 20}}>
                  Change your profile information
                </Typography>
                <Typography variant="h6" align='left'
                  color="secondary" className={classes.fieldLabel}>
                  Name
                </Typography>
                <Grid container justify="center" alignItems="center"
                  spacing={16}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="First Name"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.fname}
                      onChange={this.handleInfoChange('fname')}
                      />
                  </Grid>

                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="Last Name"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.lname}
                      onChange={this.handleInfoChange('lname')}
                      />
                  </Grid>
                </Grid>

                <Typography variant="h6" align='left'
                  color="secondary" className={classes.fieldLabel}>
                  Position
                </Typography>
                <Grid container justify="center" alignItems="center"
                  spacing={16}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="Title"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.title}
                      onChange={this.handleInfoChange('title')}
                    />
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="Company"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.company}
                      onChange={this.handleInfoChange('company')}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" align='left'
                  color="secondary" className={classes.fieldLabel}>
                  Location
                </Typography>
                <Grid container justify="center" alignItems="center"
                  spacing={16}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="City"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.city}
                      onChange={this.handleInfoChange('city')}
                    />
                  </Grid>
                  <Grid item xs={10} sm={6} className={classes.countryWrapper}>
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
                  </Grid>
                </Grid>

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
              </Grid>
            </Grid>

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
    // const { options }= this.state;

    return (
      <Grid container justify="center" alignItems="center"
        className={classes.root}>
        <Grid item xs={11} sm={9} md={8} lg={6} >
          {this.getContent()}
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountSetting));
