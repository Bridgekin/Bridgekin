import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './home.css';
import JumboImage from '../../static/cogs.jpg';

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  textColor:{color:'white'},
  jumboImage:{
    maxWidth: '100%'
  },
  jumbo: {
    height: 200
  },
  waitlistItem: {},
  textField:{ width: '100%'},
  button:{
    width: '50%',
    height: 50,
    marginTop: 30
  },
  waitlistCTA: {marginTop: 20}
});


class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    console.log('Register for waitlist');
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();

      this.setState({ field: e.target.value});
    }
  }

  render(){
    let classes = this.props.classes;

    // <div className={classes.jumboRoot}>
    //   <img className='jumboImage' src={JumboImage}/>
    //   Jumbo
    // </div>

    return (
      <div>
        <div className='jumbotron'>
          <Typography className={classes.textColor} variant="h2" gutterBottom>
            Welcome to Bridgekin
          </Typography>
          <Typography className={classes.textColor} variant="h4" gutterBottom>
            Harnessing the power of a warm connection
          </Typography>
        </div>

        <Grid container className={classes.root} spacing={16}
          direction="row" justify="center" alignItems="center">
          <Grid className={classes.waitlistItem} item xs={12} sm={5}>
            <Typography className={classes.waitlistCTA} variant="h4" gutterBottom>
              Register for the Bridgekin network today!
            </Typography>
            <Typography className={classes.waitlistCTA} variant="p" gutterBottom>
              Today, the Bridgekin network is invite-only
            </Typography>
            <Typography className={classes.waitlistCTA} variant="p" gutterBottom>
              Register for the waitlist, you'll be one of the first to be notified when the Bridgekin
              network goes public!
            </Typography>
          </Grid>

          <Grid className={classes.waitlistItem} item xs={12} sm={5}>
            <form className='form-container' onSubmit={this.handleSubmit}>
              <TextField
                required
                label="Email"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange('email')}
                />
              <TextField
                required
                label="Name"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange('name')}
                />
              <Button variant="contained" color="secondary" className={classes.button}>
                Get Notified
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
