import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {Cropper} from 'react-image-cropper'

// import saveFile from 'save-file';
// import saveSync from 'save-file/sync';
// const saveSync = require('save-file/sync')
// import base64ToFile from 'base64-to-file'
import base64 from 'file-base64';
import { dataURLToBlob } from 'blob-util'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid:{
    margin: '70px 0px 70px 0px'
  },
  modalPaper:{
    margin: 0,
    minWidth: 290,
    width: '50%'
  },
  badge: {
    top: 4,
    right: 4,
    border: `1px solid`,
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    padding: 5,
    cursor: 'pointer'
  },
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
    }
  }

  handleClose(){
    let file = this.cropper.crop();
    var blob = dataURLToBlob(file);
    let newFile = new File([blob], "my-image.png");

    this.props.handleClose(newFile);
  }

  render () {
    const {classes, open, fileUrl, ratio} = this.props;
    // let height = this.cropper.width/4;
    // debugger

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose.bind(this)}
          className={classes.cardModalWrapper}
          classes={{ paper: classes.modalPaper}}
          >
          <Badge
            badgeContent={<CloseIcon onClick={this.handleClose}/>}
            classes={{ badge: classes.badge }}
            style={{ width: '100%'}}
            >
            <Grid container justify='center' alignItems='center'
              className={classes.grid}>
              <Grid item xs={11} sm={10} md={8}>
                <Typography variant="h2" align='left' color='textPrimary'
                  style={{ margin:'30px 0px'}}>
                  {"Crop your image"}
                </Typography>
                <Cropper
                  src={fileUrl}
                  ratio={ratio || 1}
                  ref={ ref => { this.cropper = ref }}
                  width={200}
                  height={50}
                  />

                <Grid item xs={11} container justify='center'
                  style={{ marginTop: 20, marginBottom: 40 }}>
                  <Button color="primary" variant='contained'
                    onClick={this.handleClose.bind(this)} >
                    Crop
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Badge>
        </Dialog>
      </MuiThemeProvider>
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
  //
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
  //     // debugger
  //     const croppedImageBlob = this.getCroppedImg(
  //       this.imageRef,
  //       pixelCrop,
  //       'newFile.jpeg',
  //     );
  //     debugger
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
  //
  //         <DialogTitle id="alert-dialog-title">
  //           <Typography variant="h2" align='left' color='textPrimary'>
  //             {"Crop your image"}
  //           </Typography>
  //         </DialogTitle>
  //         <div >
  //           <ReactCrop
  //             src={fileUrl}
  //             crop={crop}
  //             onImageLoaded={this.onImageLoaded}
  //             onComplete={this.onCropComplete}
  //             onChange={this.onCropChange}
  //             />
  //         </div>
  //
  //         <Grid container justify='center'
  //           style={{ marginTop: 20, marginBottom: 40 }}>
  //           <Button color="primary" variant='contained'
  //             onClick={this.handleClose.bind(this)} >
  //             Crop
  //           </Button>
  //         </Grid>
  //       </Dialog>
  //     </MuiThemeProvider>
  //   )
  // }
}

export default withStyles(styles)(NotFound);
