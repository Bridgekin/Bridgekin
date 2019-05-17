import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HiringContainer from './hiring_container';

import queryString from 'query-string'

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
    currentUser: state.users[state.session.id],
  }
};

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class ChangeOpp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'Default',
      title: '',
      description: '',
      company: '',
      city: '',
      state: '',
      salary: '',
      incentiveInterview: '',
      incentiveHire: '',
      url: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
  }

  handleChange(field){
    return e => {
      e.stopPropagation();
      this.setState({ [field]: e.target.value });
    }
  }

  getPage(){
    const { classes } = this.props;
    const { page, title, description, company, city, state, salary, incentiveInterview, incentiveHire,
    url } = this.state;

    switch(page){
      case 'setIncentives':
        return 'example'
      default:
        let header = <Grid container>
          <Typography align='center' color='textPrimary'
            gutterBottom fullWidth
            style={{ fontSize: 14, marginBottom: 20}}>
            {`Start by imputting some basic information about your job or import from AngelList`}
          </Typography>
        </Grid>

        let jobForm = <Grid item xs={5}>
          <Typography align='center' color='textPrimary'
            gutterBottom fullWidth
            style={{ fontSize: 16, marginBottom: 20}}>
            {`Create Your Posting`}
          </Typography>
          <TextField
            required
            label="Title"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant='outlined'
            value={title}
            onChange={this.handleChange('title')}
            onMouseUp={this.handleChange('title')}
            />
          <TextField
            required
            label="Description"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant='outlined'
            value={description}
            onChange={this.handleChange('description')}
            onMouseUp={this.handleChange('description')}
            />
          <Grid container>
            <TextField
              required
              label="Description"
              className={classes.textField}
              margin="normal"
              fullWidth
              variant='outlined'
              value={city}
              onChange={this.handleChange('city')}
              onMouseUp={this.handleChange('city')}
              />
            <TextField
              required
              label="State"
              className={classes.textField}
              margin="normal"
              fullWidth
              variant='outlined'
              value={state}
              onChange={this.handleChange('state')}
              onMouseUp={this.handleChange('state')}
              />
          </Grid>
        </Grid>

        let angelListImport = <Grid item xs={5}>
          <TextField
            required
            label="AngelList Url"
            className={classes.textField}
            margin="normal"
            fullWidth
            value={url}
            onChange={this.handleChange('url')}
            onMouseUp={this.handleChange('url')}
            />
          <Button variant="contained" color="primary"
            fullWidth style={{marginTop: 30}}>
            {`Create Posting`}
          </Button>
        </Grid>

        let content = <Grid container>
          <Typography align='center' color='textPrimary'
            gutterBottom fullWidth
            style={{ fontSize: 14, marginBottom: 20}}>
            {`Start by imputting some basic information about your job or import from AngelList`}
          </Typography>
          <Grid container alignItems='center'>
            {jobForm}
            <Grid item xs={2}>
              <Typography color="textSecondary" align='center'
                style={{ fontSize: 13}}>
                {`OR`}
              </Typography>
            </Grid>
            {angelListImport}
          </Grid>
        </Grid>
        return content;
    }
  }

  render(){
    const { classes } = this.props;
    let content = <Grid item xs={10}>
        <Typography align='center' color='textPrimary'
          gutterBottom
          style={{ fontSize: 20, fontWeight: 600, margin: "20px 0px 30px"}}>
          {`Create your opportunity`}
        </Typography>

        {this.getPage()}
    </Grid>

    return <HiringContainer content={content} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangeOpp));
