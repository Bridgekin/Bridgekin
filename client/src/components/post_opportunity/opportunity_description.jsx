import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import ImageCropModal from '../image_upload_modal';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  descriptionHeader:{
    fontWeight: 700,
    color: theme.palette.darkGrey,
  },
  cardGrid:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  moneyLogo: {
    fontSize: 30,
    fontWeight: 500
  },
  icon:{
    fontSize: 80
  },
  section:{
    marginBottom: 40,
    width: "100%"
  },
  descriptionLabel:{
    fontSize: 22
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    // minWidth: 120,
    // maxWidth: 300,
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  selectCheckBox:{
    fontSize: 12
  },
  selectInput:{
    height: 49
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class DescriptionField extends React.Component {
  constructor(props){
    super(props);
    // let networks = this.formatNetworks();
    this.state = {
      networks: [],
      profilePicFile: null,
      previewUrlForModal: null,
      imageModalOpen: false,
      selectAll: false
    }

    // this.fileReader = new FileReader();

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleToggleSelectAll = this.handleToggleSelectAll.bind(this);
  }

  // fileReader.onloadend = () => {
  //   this.setState({
  //     profilePicFile: file,
  //     previewUrlForModal: fileReader.result,
  //     imageModalOpen: bool
  //   }, () => {
  //     this.props.handleFile(this.state.profilePicFile);
  //     // if(!bool){
  //     //   // send file back to parent component
  //     //   this.props.handleFile(file);
  //     // }
  //   })
  // }

  formatNetworks(){
    const { availNetworks } = this.props;
    let networks = Object.values(availNetworks);
    let results = {};
    for(let i = 0; i < networks.length; i++){
      results[networks[i].id] = false;
    }
    return results;
  }

  // componentDidMount(){
  //   let currentNetworks = this.state.networks;
  //   let networks = this.props.networks;
  //   debugger
  //   for(let i = 0; i < networks.length; i++){
  //     currentNetworks[networks[i]] = true;
  //   }
  //   this.setState({ networks: currentNetworks })
  // }

  handleChange(field){
    return e => {
      e.preventDefault();
      this.props.handleChange(field)(e.target.value);
    }
  }

  handleMultiSelectChange(field){
    return e => {
      let networks = e.target.value;
      this.setState({ [field]: networks},
      () => {
        debugger
        this.props.handleChange('networks')(networks)
      });
    }
  };

  handleToggleSelectAll(){
    const { selectAll } = this.state;
    const { availNetworks } = this.props;
    if(selectAll){
      this.setState({
        networks: [],
        selectAll: false
      }, () => {
        this.props.handleChange('networks')([])
      })
    } else {
      let allNetworks = Object.values(availNetworks).map(network => (
        network.id
      ));
      this.setState({
        networks: allNetworks,
        selectAll: true
      },
      () => {
        this.props.handleChange('networks')(allNetworks)
      })
    }
  }

  handleClick(id){
    return e => {
      e.preventDefault();
      let { networks } = this.state;
      networks[id] = !networks[id];
      this.setState( { networks },
        () => {
          let chosenOptions = Object.keys(networks).filter(k => networks[k]);
          this.props.handleChange('networks')(chosenOptions);
        });
    }
  }

  handleFile(e){
    // debugger
    let file = e.currentTarget.files[0];
    this.handleFileHelper(file, true);
  }

  handleCloseImageModal(newFile){
    // debugger
    if(newFile !== '' && newFile !== null){
      this.handleFileHelper(newFile, false);
    } else {
      this.setState({ imageModalOpen: false},
      () => this.props.handleFile(this.state.profilePicFile))
    }
  }

  handleFileHelper(file, bool){
    let fileReader = new FileReader();
    let that = this;
    // debugger
    fileReader.onloadend = (that) => {
      // debugger
      this.setState({
        profilePicFile: file,
        previewUrlForModal: fileReader.result,
        imageModalOpen: bool
      }, () => {
        // debugger
        this.props.handleFile(file, fileReader.result );
        // if(!bool){
        //   // send file back to parent component
        //   this.props.handleFile(file);
        // }
      })
    }

    if(file){
      fileReader.readAsDataURL(file)
    }
  }

  handleRemoveFile(){
    this.setState({
      profilePicFile: null,
      previewUrlForModal: null,
    }, () => {
      // this.fileReader = new FileReader();
      this.props.handleRemoveFile();
    });
  }

  render (){
    let { classes, pictureUrl } = this.props;
    let { networks, imageModalOpen, profilePicFile, previewUrlForModal } = this.state;
    const { availNetworks, picture } = this.props;
    const pictureUploaded = Boolean(pictureUrl)
    // const error = Object.keys(networks).filter(v => v).length < 1

    let preview = pictureUrl ? (
      <img
        alt="account-pic-preview"
        src={pictureUrl}
        style={{ margin: "20px 0px 20px 0px",
                width: '100%', height: 'auto' }}/>
    ) : ('')

    let fields = Object.values(availNetworks).map(network => (
        <FormControlLabel
          control={
            <Checkbox
              checked={networks[network.id]}
              onChange={this.handleClick(network.id)}
              value={network.title} />
          }
          label={network.title}
          classes={{ label: classes.descriptionLabel }}
        />
    ));

    return (
      <Grid container className={classes.root}
        justify='center' alignItems='center'>

        <Grid item xs={10}  container justify="flex-start"
          alignItems='center'>
          <div className={classes.section}>
            <Typography variant="h5" gutterBottom align='left'
              className={classes.descriptionHeader} >
              Headline of your Opportunity
            </Typography>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              fullWidth
              value={this.props.title}
              onChange={this.handleChange('title')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputProps={{maxLength: 100}}
            />
          </div>

          <div className={classes.section}>
            <Typography variant="h5" gutterBottom align='left'
              className={classes.descriptionHeader} >
              Description of your Opportunity
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows="8"
              fullWidth
              value={this.props.description}
              onChange={this.handleChange('description')}
              className={classes.textField}
              variant="outlined"
            />
          </div>

          <Typography variant="h5" align='left'
            className={classes.descriptionHeader} >
            Upload image (optional)
          </Typography>
          <Grid container justify='flex-start' alignItems='center'
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
              <Grid item xs={12} sm={10} md={8} sm={6}>
                {!imageModalOpen && preview}
              </Grid>
            </Grid>
            <Grid container justify='flex-start' alignItems='center'
              spacing={8}>
              <Grid item xs={10} sm={7} md={5}
                container justify='flex-start' >
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span"
                    color='primary'
                    style={{ fontWeight: 600, marginTop: 20 }}>
                    Upload image here
                  </Button>
                </label>
              </Grid>
              <Grid item xs={10} sm={4} md={3}
                container justify='center'>
                {pictureUploaded &&
                  <Button variant="contained" component="span"
                    color='primary'
                    style={{ fontWeight: 600, marginTop: 20  }}
                    onClick={this.handleRemoveFile.bind(this)}>
                    Delete
                  </Button>}
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom align='left'
            className={classes.descriptionHeader} >
            Share this opportunity with
          </Typography>
          <Grid container justify='space-around' alignItems='center'
            style={{ marginBottom: 30}} spacing={8}>
            <Grid item xs={10} sm={6} md={4} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectAll}
                    onChange={this.handleToggleSelectAll}
                    value="select-all"
                    classes={{ root: classes.selectCheckBox}}
                  />
                }
                label="Select All"
              />
            </Grid>

            <Grid item xs={10} sm={8} md={5} lg={4}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Networks</InputLabel>
                <Select
                  multiple
                  value={this.props.networks}
                  onChange={this.handleMultiSelectChange('networks')}
                  classes={{ root: classes.selectInput}}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => {
                        console.log('value', value);
                        console.log('network', availNetworks[value]);
                        return <Chip key={value} label={availNetworks[`${value}`].title}
                          className={classes.chip} />
                      })}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {Object.values(availNetworks).map(network => (
                    <MenuItem key={network.id} value={network.id}
                      disableRipple>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.props.networks.includes(network.id)}
                            value={network.id}
                            classes={{ root: classes.selectCheckBox}}
                          />
                        }
                        label={network.title}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={10} sm={8} md={3} lg={2}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Connections</InputLabel>
                <Select
                  input={<Input id="select-multiple-chip" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem key={0} value={''} disabled>
                    Coming Soon
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={10} sm={8} md={4} lg={3}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Network Circles</InputLabel>
                <Select
                  input={<Input id="select-multiple-chip" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem key={0} value={''} disabled>
                    Coming Soon
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
        </Grid>

        <ImageCropModal
          handleClose={this.handleCloseImageModal.bind(this)}
          open={imageModalOpen}
          fileUrl={previewUrlForModal}
          ratio={4/1}/>

      </Grid>
    )
  }
}

export default withStyles(styles)(DescriptionField);
