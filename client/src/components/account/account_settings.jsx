import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

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
import PersonIcon from '@material-ui/icons/PersonSharp';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';

import withWidth from '@material-ui/core/withWidth';

// import UpdateUserModal from './update_user_modal';
// import ImageCropModal from '../image_upload_modal';
import CircularProgress from '@material-ui/core/CircularProgress';

// import countryList from 'react-select-country-list';
import countryList from 'country-list';

import { fetchEmailNotification, createEmailNotification }
  from '../../actions/email_notification_actions';
import { updateUser } from '../../actions/user_actions';
import { openUpdateUser, openImageCrop } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  notification: state.entities.emailNotification,
  userErrors: state.errors.users,
  workspaces: state.workspaces
});

const mapDispatchToProps = dispatch => ({
  openUpdateUser: (settingsType) => dispatch(openUpdateUser(settingsType)),
  fetchEmailNotification: () => dispatch(fetchEmailNotification()),
  createEmailNotification: (notification) => dispatch(createEmailNotification(notification)),
  updateUser: user => dispatch(updateUser(user)),
  openImageCrop: payload => dispatch(openImageCrop(payload)),
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    // marginTop: 75,
    // marginBottom: 75,
    // position: 'relative',
    // top: 164,
    // padding: "214px 20px 50px"
  },
  pic: {
    width: '100%',
    height: 'auto',
    // borderRadius: 0,
  },
  addProfilePicIcon:{
    width: '100%',
    height: 217,
    // backgroundColor: theme.palette.lightGrey,
    color: theme.palette.text.primary
  },
  card:{
    // height: 118,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: theme.palette.base3,
    // marginTop: 18,
    // width: '100%',
    borderRadius: 0,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
      padding: '40px 0px 15px',
      // paddingBottom: 15
    },
  },
  cardSection:{
    marginTop: 10
  },
  content:{
    // margin: ,
    padding: "0px 15px"
  },
  passwordContent:{
    margin: '0 auto',
    width: '50%',
    display: 'flex',
    direction: 'column'
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
  submitButton: { margin: "20px 20px 20px 0px" },
  buttonWrapper:{
    // width:'100%'
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
    marginTop: 15,
    fontSize: 15
  },
  // iconWrapper:{
  //   backgroundColor: theme.palette.grey1
  // },
  countryWrapper:{
    display: 'flex',
    direction: 'column'
  },
  input: {
    display: 'none',
  },
  textField:{
    marginLeft: 0
  },
  settingsContainer:{
    overflow: 'scroll',
    flexGrow: 1,
    // paddingTop: 15,
    [theme.breakpoints.up('sm')]: {
      // paddingTop: 0
    },
  }
});


class AccountSetting extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // notificationSetting: 'Never',
      settingState: "General",
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
      // modalOpen: false,
      email: this.props.currentUser.email,
      fname: this.props.currentUser.fname,
      lname: this.props.currentUser.lname,
      title: this.props.currentUser.title,
      company: this.props.currentUser.company,
      city: this.props.currentUser.city,
      state: this.props.currentUser.state,
      linkedInUrl: this.props.currentUser.linkedInUrl,
      // defaultNetworkId: this.props.currentUser.defaultNetworkId,
      country: countryList.getName(this.props.currentUser.country) || '',
      profilePicFile: null,
      previewUrl: null,
      imageModalOpen: false,
      mobileImageCropPending: false
    }

    this.options = Object.values(countryList.getNames());
    // this.options = countryList().getData()

    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeGeneralInformation = this.changeGeneralInformation.bind(this);
    // this.handleDefaultWorkspaceChange = this.handleDefaultWorkspaceChange.bind(this);
  }

  componentDidMount(){
    // this.props.fetchEmailNotification()
    // .then(() => {
    //   this.setState({ notificationSetting: this.props.notification.notificationSetting })
    // })
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  // handleNotificationChange = event => {
  //   let notificationSetting = event.target.value;
  //   this.props.createEmailNotification({ notificationSetting })
  //   .then(() => {
  //     this.setState({ notificationSetting });
  //   })
  // }

  // handleDefaultWorkspaceChange(e){
  //   let workspaceId = e.target.value;
  //   const formData = new FormData();
  //   formData.append('user[defaultNetworkId]', workspaceId)
  //   formData.append('user[id]', this.props.currentUser.id)
  //
  //   this.props.updateUser(formData)
  //   .then(()=> this.setState({ modalOpen: true, defaultNetworkId: workspaceId}))
  // }

  handleChangeFill(path){
    return () => {
      // this.setState({ settingState })
      if (path){
        this.props.history.push(`/account/settings/${path}`)
      } else {
        this.props.history.push(`/account/profile`)
      }
    }
  }

  handleInfoChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  // handleModalClose = () => {
  //   if(this.props.userErrors.length > 0){
  //     this.setState({
  //       modalOpen: false
  //     })
  //   } else {
  //     this.setState({
  //       // modalOpen: false,
  //       // currentPassword: '',
  //       // password: '',
  //       // passwordConfirmation: '',
  //       email: this.props.currentUser.email,
  //       fname: this.props.currentUser.fname,
  //       lname: this.props.currentUser.lname,
  //       title: this.props.currentUser.title,
  //       company: this.props.currentUser.company,
  //       city: this.props.currentUser.city,
  //       state: this.props.currentUser.state,
  //       country: countryList.getName(this.props.currentUser.country) || '',
  //       // mobileImageCropPending: false
  //     },
  //     ()=> {
  //       this.props.history.push('/account/profile')
  //     })
  //   }
  // };

  changePassword(){
    const passwords = ['password', 'passwordConfirmation', 'currentPassword'];
    const formData = new FormData();
    for (let i = 0; i < passwords.length; i++){
      formData.append(`user[${passwords[i]}]`, this.state[passwords[i]]);
    }
    formData.append('user[id]', this.props.currentUser.id)

    this.props.updateUser(formData)
    .then(()=> {
      this.props.openUpdateUser('password');
      this.setState({
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      })
    })
  }

  changeEmail(){
    const formData = new FormData();
    formData.append('user[email]', this.state.email)
    formData.append('user[id]', this.props.currentUser.id)

    this.props.updateUser(formData)
    .then(()=> this.props.openUpdateUser('email'))
  }

  changeGeneralInformation(e){
    e.preventDefault();

    let { country, profilePicFile, previewUrl } = this.state;
    const formData = new FormData();

    let fields = ['fname', 'lname', 'city', 'state', 'title',
    'company', 'linkedInUrl'];
    for (let i = 0; i < fields.length; i++){
      formData.append(`user[${fields[i]}]`, this.state[fields[i]]);
    }

    if (profilePicFile){ formData.append('user[profilePic]', profilePicFile ) }
    formData.append('user[id]', this.props.currentUser.id)
    formData.append('user[country]', countryList.getCode(country))

    this.props.updateUser(formData)
    .then(() => {
      this.props.openUpdateUser('general');
      this.setState({
        email: this.props.currentUser.email,
        fname: this.props.currentUser.fname,
        lname: this.props.currentUser.lname,
        title: this.props.currentUser.title,
        company: this.props.currentUser.company,
        city: this.props.currentUser.city,
        state: this.props.currentUser.state,
        mobileImageCropPending: false
      });
    })
  }

  //#######################

  handleFile(e){
    let file = e.currentTarget.files[0];
    if (this.props.width !== 'xs'){
      this.handleFileHelper(file, true, false);
    } else {
      this.handleFileHelper(file, false, true);
    }
  }

  handleSaveCroppedImage(newFile){
    if(newFile){
      this.handleFileHelper(newFile, false, false)
    }
    // if(newFile && this.props.width !== 'xs'){
    //   // normal screens
    //   this.handleFileHelper(newFile, false, false)
    // } else if (newFile && this.props.width === 'xs'){
    //   //mobile screens
    //   this.handleFileHelper(newFile, false, false)
    // } else {
    //   this.setState({ imageModalOpen: false })
    // }
  }

  handleFileHelper(file, modalOpenBool, mobilePendingBool){
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        profilePicFile: file,
        previewUrl: fileReader.result,
        mobileImageCropPending: mobilePendingBool
      },
      () => {
        if(modalOpenBool){
          let payload = {
            ratio: (1),
            fileUrl: fileReader.result,
            handleDelete: this.handleRemoveFile.bind(this),
            handleSave: this.handleSaveCroppedImage.bind(this)
          }
          this.props.openImageCrop(payload);
        }
      })
    }

    if(file){
      fileReader.readAsDataURL(file)
    }
  }

  handleRemoveFile(){
    this.setState({
      profilePicFile: null,
      previewUrl: null,
    })
  }

  //#######################

  getContent(){
    const { classes, currentUser, width }= this.props;
    const { settingState, previewUrl, imageModalOpen,
      profilePicFile, mobileImageCropPending } = this.state;

    const pictureUploaded = Boolean(previewUrl)

    // let profilePicture = currentUser.profilePicUrl ? (
    //   <Avatar
    //     className={classes.pic}
    //     src={currentUser.profilePicUrl}
    //     alt="Account Profile Picture"
    //     onClick={()=> this.props.history.push('/account/settings/general')}
    //   />
    // ) : (
    //   <PersonIcon
    //     className={classes.addProfilePicIcon}
    //     onClick={this.handleChangeFill('general')}
    //   />
    // )

    let preview = previewUrl ? (
      <img
        alt="account-pic-preview"
        src={previewUrl}
        style={{ margin: "20px 0px", maxWidth: '100%', height: 'auto' }}/>
    ) : ('')

    let pictureSection = mobileImageCropPending ? (
      <Grid container justify='center' alignItems='center'
        style={{ height: 100}}>
        <CircularProgress />
      </Grid>
    ) : (
      preview
    )

    let pathName = this.props.location.pathname.split('/').pop();

    switch (pathName) {
      case "email":
        return(
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">

              <Grid item xs={11} sm={10} container
                justify="center" alignItems="center"
                className={classes.content}>
                <Typography variant="h5" align='left'
                  color="textPrimary" gutterBottom>
                  Reset Email Below
                </Typography>
                <TextField
                  id="standard-email"
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  value={this.state.email}
                  onChange={this.handleInfoChange('email')}
                />
                <Grid container justify='flex-start'>
                  <Button className={classes.submitButton}
                    onClick={this.handleChangeFill('')} variant='contained'>
                    Back
                  </Button>

                  <Button color="primary" className={classes.submitButton}
                    onClick={this.changeEmail} variant='contained'>
                    Change Email
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        );
      case "password":
        return(
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">

              <Grid item xs={8} sm={6} container
                justify="center" alignItems="center"
                className={classes.content}>
                <Typography variant="h5" align='left'
                  color="textPrimary" gutterBottom>
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
                <Grid container justify='flex-start'>
                  <Button className={classes.submitButton}
                    onClick={this.handleChangeFill('')} variant='contained'>
                    Back
                  </Button>

                  <Button color="primary" className={classes.submitButton}
                    onClick={this.changePassword} variant='contained'>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        );
      default:
        let countryOptions = this.options.reduce((result, option) =>{
          if (option !== "United States"){
            result.push(<MenuItem value={option}>{option}</MenuItem>)
          }
          return result;
        }, []);

        countryOptions.unshift(
          <MenuItem value={'United States'}>
            {'United States'}
          </MenuItem>
        )

        return(
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">

              <Grid item xs={12} sm={10} className={classes.content}>
                <Typography variant="h5" align='left'
                  color="textPrimary" gutterBottom
                  style={{marginBottom: 20, fontSize: 18}}>
                  Change your profile information
                </Typography>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.fieldLabel}>
                  Name
                </Typography>
                <Grid container justify="center" alignItems="center"
                  spacing={16}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="First Name"
                      className={classes.textField}
                      value={this.state.fname}
                      onChange={this.handleInfoChange('fname')}
                      />
                  </Grid>

                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="Last Name"
                      className={classes.textField}
                      value={this.state.lname}
                      onChange={this.handleInfoChange('lname')}
                      />
                  </Grid>
                </Grid>

                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.fieldLabel}>
                  Position
                </Typography>
                <Grid container justify="center" alignItems="center"
                  spacing={24}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="Title"
                      className={classes.textField}
                      value={this.state.title}
                      onChange={this.handleInfoChange('title')}
                    />
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="Company"
                      className={classes.textField}
                      value={this.state.company}
                      onChange={this.handleInfoChange('company')}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.fieldLabel}>
                  Location
                </Typography>
                <Grid container justify="center" alignItems="flex-end"
                  spacing={24}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      id="standard-name"
                      label="City"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.city}
                      fullWidth
                      onChange={this.handleInfoChange('city')}
                    />
                  </Grid>
                  <Grid item xs={10} sm={6} className={classes.countryWrapper}
                    direction="column">
                    <InputLabel htmlFor="country-simple"
                      className={classes.selectLabel}>Country</InputLabel>
                    <Select
                      label='Country'
                      value={this.state.country}
                      onChange={this.handleInfoChange('country')}
                      fullWidth
                      inputProps={{
                        name: 'country',
                        id: 'country-simple',
                      }}
                      style={{ marginBottom: 8}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {countryOptions}
                    </Select>
                  </Grid>
                </Grid>

                {/* Social - LinkedIn*/}
                <TextField
                  id="standard-name"
                  label="LinkedIn Url"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.linkedInUrl}
                  fullWidth
                  onChange={this.handleInfoChange('linkedInUrl')}
                />

                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.fieldLabel}>
                  Upload Profile Picture
                </Typography>
                <Grid container justify="flex-start" alignItems="center"
                  style={{ marginBottom: 30}}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={this.handleFile.bind(this)}
                    onClick={(event)=> {
                      event.target.value = null
                    }}
                  />
                  <Grid container justify="flex-start">
                    <Grid item xs={12} sm={10} md={8}>
                      {pictureSection}
                    </Grid>
                  </Grid>
                  <Grid container justify='flex-start' alignItems='center'
                    spacing={8}>
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" component="span"
                        style={{ margin: "20px 10px 0px 0px", fontWeight: 600 }}>
                        Upload image here
                      </Button>
                    </label>
                    {pictureUploaded &&
                      <Button variant="contained" component="span"
                        color='primary'
                        style={{ fontWeight: 600, marginTop: 20  }}
                        onClick={this.handleRemoveFile.bind(this)}>
                        Delete
                      </Button>}
                  </Grid>
                  <Grid container justify='flex-start' alignItems='center'>
                    {width === 'xs' &&
                      <Typography variant="body2" align='left'
                        style={{ fontSize: 11, marginTop: 20 }}>
                        {`*Image cropping currently only available on desktop`}
                      </Typography>
                    }
                    <Typography variant="body2" align='left'
                      style={{ fontSize: 11, marginTop: 20 }}>
                      {`*We recommend uploading images with a width at least 600px`}
                    </Typography>
                  </Grid>
                </Grid>

                {/*<Grid container>
                  <Button color='default' variant='contained'
                    onClick={() => this.props.history.push("/account/settings/notifications")}>
                    {`Edit Notification Settings`}
                  </Button>
                </Grid>*/}

                <Grid container justify='space-between'
                  className={classes.buttonWrapper}>
                  <Button className={classes.submitButton}
                    onClick={this.handleChangeFill('')} variant='contained'>
                    Back
                  </Button>

                  <Button color="primary" className={classes.submitButton}
                    onClick={this.changeGeneralInformation}
                    variant='contained'>
                    Update
                  </Button>
                </Grid>
              </Grid>

              {/*<ImageCropModal
                handleClose={this.handleCloseImageModal.bind(this)}
                handleDelete={this.handleRemoveFile.bind(this)}
                open={imageModalOpen}
                file={profilePicFile}
                fileUrl={previewUrl}
                ratio={1}/>*/}
            </Grid>
          </Card>
        );
      // default:

      // <Grid item xs={8} md={5} container justify='center'>
      //   {profilePicture}
      //   <div style={{ display: 'flex'}}>
      //     <Button color="textPrimary"
      //       onClick={() => this.props.history.push('/account/settings/general')}>
      //       Update Profile Picture
      //     </Button>
      //   </div>
      // </Grid>
      // <Grid item xs={8} md={6} className={classes.content}>
        // return (
        //   <Card className={classes.card}>
        //     <Grid container justify="center" alignItems="flex-start">
        //
        //       <Grid item xs={12} sm={8} className={classes.content}>
        //         <div className={classes.wrapper}>
        //           <Typography variant="h3" align='left'
        //             color="textPrimary">
        //             {`${currentUser.fname} ${currentUser.lname}`.toUpperCase()}
        //           </Typography>
        //         </div>
        //
        //         <Grid container>
        //           <Typography variant="h6" align='left'
        //             color='textPrimary'>
        //             Email Address
        //           </Typography>
        //           <Link to='/account/settings/email'
        //             style={{ marginLeft: 15}}>
        //             <Typography variant="h6" align='left'
        //               color='textPrimary'
        //               style={{fontWeight: 300}}>
        //               Change
        //             </Typography>
        //           </Link>
        //         </Grid>
        //         <Typography variant="body1" gutterBottom align='left'
        //           color="textPrimary" style={{ marginBottom: 15}}>
        //           {currentUser.email}
        //         </Typography>
        //
        //         <Grid container>
        //           <Typography variant="h6" align='left'
        //             color='textPrimary'>
        //             Current Password
        //           </Typography>
        //           <Link to='/account/settings/password'
        //             style={{ marginLeft: 15}}>
        //             <Typography variant="h6" align='left'
        //               color='textPrimary' style={{ fontWeight: 300 }}>
        //               Change
        //             </Typography>
        //           </Link>
        //         </Grid>
        //
        //         <Typography variant="body1" gutterBottom align='left'
        //           color="textPrimary" style={{ marginBottom: 15}}>
        //           {"********"}
        //         </Typography>
        //
        //         <Typography variant="h6" align='left'
        //           color="textPrimary" className={classes.fieldLabel}>
        //           Default Network
        //         </Typography>
        //         <Grid container justify="flex-start" alignItems="center"
        //           direction='column'>
        //           <Select
        //             value={this.state.defaultNetworkId}
        //             onChange={this.handleDefaultWorkspaceChange}
        //             inputProps={{
        //               name: 'defaultNetworkId',
        //               id: 'defaultNetworkId-simple',
        //             }}
        //             renderValue={selected => workspaces[selected].title}
        //           >
        //             {Object.values(workspaces).map(workspace => (
        //               <MenuItem value={workspace.id}>
        //                 {workspace.title}
        //               </MenuItem>
        //             ))}
        //           </Select>
        //         </Grid>
        //
        //         {false && <Typography variant="subtitle1" align='left'
        //           color="textPrimary" style={{ marginTop: 15}}>
        //           {`How often would you like to be notified about
        //             opportunities by email?`}
        //         </Typography>}
        //
        //         {false && <FormControl component="fieldset" className={classes.formControl}>
        //           <RadioGroup
        //             aria-label="Notifications"
        //             name="notifications"
        //             className={classes.group}
        //             value={this.state.notificationSetting}
        //             onChange={this.handleNotificationChange}
        //           >
        //             <FormControlLabel value="Weekly" control={<Radio />} label="Weekly email recap" />
        //             <FormControlLabel value="Never" control={<Radio />} label="Never, I am immune to FOMO" />
        //           </RadioGroup>
        //         </FormControl>}
        //       </Grid>
        //     </Grid>
        //   </Card>
        // );
      // return <div></div>
    }
  }

  render(){
    const { classes }= this.props;
    // const { options }= this.state;

    return (
      <Grid container justify='center' alignItems='center'>
        <div className={classes.settingsContainer}>
          {this.getContent()}
        </div>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(AccountSetting)));

// <Grid container justify="center" alignItems="center"
//   className={classes.root}>
//   <Grid item xs={12} sm={9} md={8} lg={6} >
//     {this.getContent()}
//   </Grid>
// </Grid>
