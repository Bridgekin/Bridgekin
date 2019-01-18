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

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const styles = theme => ({
  root: {
    flexGrow: 1
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
    this.props.handleClose(this.state.croppedImageFile);
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageBlob = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
      var croppedImageFile = new File([croppedImageBlob], "newFile.jpeg");
      this.setState({ croppedImageFile });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        // window.URL.revokeObjectURL(this.fileUrl);
        // this.fileUrl = window.URL.createObjectURL(blob);
        // resolve(this.fileUrl);
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  render () {
    const {classes, open, file, fileUrl} = this.props;
    const { crop } = this.state;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose.bind(this)}
          className={classes.cardModalWrapper}
          >

          <DialogTitle id="alert-dialog-title">
            <Typography variant="h2" align='left' color='textPrimary'>
              {"Crop your image"}
            </Typography>
          </DialogTitle>
          <div >
            <ReactCrop
              src={fileUrl}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              />
          </div>

          <Grid container justify='center'
            style={{ marginTop: 20, marginBottom: 40 }}>
            <Button color="primary" variant='contained'
              onClick={this.handleClose.bind(this)} >
              Close
            </Button>
          </Grid>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(NotFound);
