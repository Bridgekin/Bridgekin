import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import withWidth from '@material-ui/core/withWidth';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Cropper} from 'react-image-cropper'
// import saveFile from 'save-file';
// import saveSync from 'save-file/sync';
// const saveSync = require('save-file/sync')
// import base64ToFile from 'base64-to-file'
import base64 from 'file-base64';
import { dataURLToBlob } from 'blob-util'
// import sharp from 'sharp';
import Jimp from 'jimp';

import { closeImageCrop } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  imageCropModal: state.modals.imageCrop
});

const mapDispatchToProps = dispatch => ({
  closeImageCrop: () => dispatch(closeImageCrop())
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid:{
    // margin: '30px 0px 30px 0px'
  },
  modalPaper:{
    margin: 0,
    minWidth: 290,
    width: '50%',
    backgroundColor: theme.palette.base3
  },
  badge: {
    top: 19,
    right: 19,
    border: `1px solid`,
    borderRadius: '50%',
    height: 'auto',
    color: theme.palette.base3,
    backgroundColor: theme.palette.text.primary,
    padding: 5,
    cursor: 'pointer'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '20%',
    left: '50%',
    marginLeft: -12,
  },
  listText:{ color: theme.palette.text.primary}
});

class NotFound extends Component {
  constructor(props){
    super(props);
    this.state = {
      croppedImageFile: null,
      crop: {
        aspect: 1,
        width: 50,
        x: 0,
        y: 0,
      },
      loading: false
    }

    this.cropper = React.createRef();

    this.handleClose = this.handleClose.bind(this);
    this.handleCloseMobile = this.handleCloseMobile.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.urlToFile = this.urlToFile.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   debugger
  //   if(this.props.width !== 'xs'){
  //     return true;
  //   } else if (this.props.width === 'xs' &&
  //             nextProps.fileUrl !== this.props.fileUrl){
  //     this.handleClose()
  //   }
  //   if(nextProps.fileUrl != )
  //
  //   return true
  // }

  componentDidUpdate(prevProps) {
    const prevModal = prevProps.imageCropModal;
    const currentModal = this.props.imageCropModal;
    if (this.props.width === 'xs' &&
        prevModal.fileUrl !== currentModal.fileUrl){
      this.handleCloseMobile();
    }
  }

  handleCloseMobile(){
    // sharp(this.props.fileUrl)
    //   .resize(300,130)
    //   .toFile('output.png')
    //   .then(file => {
    //     debugger
    //   });
    // debugger
    // Jimp.read(this.props.fileUrl)
    // // .then(image => image.getBase64Async(Jimp.MIME_PNG))
    // .then(image => {
    //   // debugger
    //   return image
    //     .cover(800, 346)
    //     .getBase64Async(Jimp.MIME_PNG);
    // })
    // .then(image => {
    //   let blob = dataURLToBlob(image);
    //   let newFile = new File([blob], "my-image.png");
    //   // debugger
    //   this.props.handleClose(newFile);
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
    this.urlToFile(this.props.imageCropModal.fileUrl)
  }

  handleClose(){
    this.setState({ loading: true},
    () => {
      let fileUrl = this.cropper.crop();

      this.urlToFile(fileUrl)
    })
    // let blob = dataURLToBlob(file);
    // let newFile = new File([blob], "my-image.png");
    //
    // this.props.handleClose(newFile);
  }

  urlToFile(fileUrl){
    let width = (346 * this.props.imageCropModal.ratio);

    Jimp.read(fileUrl)
    .then(image => {
      return image
        .cover(width , 346)
        .getBase64Async(Jimp.MIME_PNG);
    })
    .then(image => {
      let blob = dataURLToBlob(image);
      let newFile = new File([blob], "my-image.png");
      this.setState({ loading: false },
      () => {
        this.props.imageCropModal.handleSave(newFile);
        this.props.closeImageCrop();
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }

  handleDelete(){
    this.props.imageCropModal.handleDelete();
    this.props.imageCropModal.handleSave('');
    this.props.closeImageCrop();
    // this.props.imageCropModal.handleClose('');
  }

  render () {
    const {classes, ratio, imageCropModal} = this.props;
    const { loading } = this.state;
    // let height = this.cropper.width/4;

    return (
      <Dialog
        open={imageCropModal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleDelete}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}
        >
        <Badge
          badgeContent={<CloseIcon onClick={this.handleDelete}/>}
          classes={{ badge: classes.badge }}
          style={{ width: '100%'}}
          >
          <Grid container justify='center' alignItems='center'
            className={classes.grid}>
            <Grid item xs={11} sm={10} md={8}>
              <Typography variant="h2" align='left' color='textPrimary'
                style={{ margin:'15px 0px'}}>
                {"Crop your image"}
              </Typography>
              <Cropper
                src={imageCropModal.fileUrl}
                ratio={imageCropModal.ratio || 1}
                ref={ ref => { this.cropper = ref }}
                width={200}
                height={50}
                />

              <Grid item xs={11} container justify='center'
                style={{ marginTop: 20, marginBottom: 40 }}>
                <Button color="primary" variant='contained'
                  onClick={this.handleClose} disabled={loading}>
                  Crop
                  {loading && <CircularProgress size={24}
                  className={classes.buttonProgress} />}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Badge>
      </Dialog>
    )
  }

  // handleClose(){
  //   // debugger
  //   if(this.state.croppedImageFile){
  //     this.props.handleClose(this.state.croppedImageFile);
  //   } else {
  //     this.props.handleClose('')
  //   }
  //   this.imageRef = null;
  //   this.setState({ croppedImageFile: null })
  // };

  // onImageLoaded = (image, pixelCrop) => {
  //   this.imageRef = image;
  // };
  //
  // onCropComplete = (crop, pixelCrop) => {
  //   this.makeClientCrop(crop, pixelCrop);
  // };
  //
  // onCropChange = crop => {
  //   this.setState({ crop });
  // };
  //
  // makeClientCrop(crop, pixelCrop) {
  //   if (this.imageRef && crop.width && crop.height) {
  //     const croppedImageBlob = this.getCroppedImg(
  //       this.imageRef,
  //       pixelCrop,
  //       'newFile.jpeg',
  //     );
  //
  //     let croppedImageFile = new File([croppedImageBlob], "newFile.jpeg");
  //     // let croppedImageFile = saveSync(croppedImageBlob, 'example2.mp3')
  //     this.setState({ croppedImageFile });
  //     // this.imageRef = null;
  //   }
  // }
  //
  // getCroppedImg(image, pixelCrop, fileName) {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = pixelCrop.width;
  //   canvas.height = pixelCrop.height;
  //   const ctx = canvas.getContext('2d');
  //   // debugger
  //   ctx.drawImage(
  //     image,
  //     pixelCrop.x,
  //     pixelCrop.y,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //     0,
  //     0,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //   );
  //
  //   return canvas.toBlob(blob => {
  //       // debugger
  //       blob.name = fileName;
  //       return blob
  //   }, 'image/jpeg');
  //   // return new Promise((resolve, reject) => {
  //   //   canvas.toBlob(blob => {
  //   //     blob.name = fileName;
  //   //     // window.URL.revokeObjectURL(this.fileUrl);
  //   //     // this.fileUrl = window.URL.createObjectURL(blob);
  //   //     // resolve(this.fileUrl);
  //   //     resolve(blob);
  //   //   }, 'image/jpeg');
  //   // });
  // }
  //
  // render () {
  //   const {classes, open, file, fileUrl} = this.props;
  //   const { crop } = this.state;
  //
  //   // debugger
  //
  //   return (
  //     <MuiThemeProvider theme={theme} className={classes.root}>
  //       <Dialog
  //         open={open}
  //         aria-labelledby="alert-dialog-title"
  //         aria-describedby="alert-dialog-description"
  //         onClose={this.handleClose.bind(this)}
  //         className={classes.cardModalWrapper}
  //         >
  //         <Badge
  //           badgeContent={<CloseIcon onClick={this.handleDelete}/>}
  //           classes={{ badge: classes.badge }}
  //           style={{ width: '100%'}}
  //           >
  //           <Grid container justify='center' alignItems='center'
  //             className={classes.grid}>
  //             <Grid item xs={11} sm={10} md={8}>
  //               <Typography variant="h2" align='left' color='textPrimary'
  //                 style={{ margin:'30px 0px'}}>
  //                 {"Crop your image"}
  //               </Typography>
  //
  //               <ReactCrop
  //                 src={fileUrl}
  //                 crop={crop}
  //                 onImageLoaded={this.onImageLoaded}
  //                 onComplete={this.onCropComplete}
  //                 onChange={this.onCropChange}
  //                 />
  //
  //               <Grid item xs={11} container justify='center'
  //                 style={{ marginTop: 20, marginBottom: 40 }}>
  //                 <Button color="primary" variant='contained'
  //                   onClick={this.handleClose} >
  //                   Crop
  //                 </Button>
  //               </Grid>
  //
  //             </Grid>
  //           </Grid>
  //         </Badge>
  //       </Dialog>
  //     </MuiThemeProvider>
  //   )
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(NotFound)));
