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

const styles = theme => ({
  root: {
    flexGrow: 1,
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
});

class DescriptionField extends React.Component {
  constructor(props){
    super(props);
    let networks = this.formatNetworks();
    this.state = {
      networks
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatNetworks(){
    const { availNetworks } = this.props;
    let networks = Object.values(availNetworks);
    let results = {};
    for(let i = 0; i < networks.length; i++){
      results[networks[i].id] = false;
    }
    return results;
  }

  componentDidMount(){
    let currentNetworks = this.state.networks;
    let networks = this.props.networks;
    for(let i = 0; i < networks.length; i++){
      currentNetworks[networks[i]] = true;
    }
    this.setState({ networks: currentNetworks })
  }

  handleChange(field){
    return e => {
      e.preventDefault();
      this.props.handleChange(field)(e.target.value);
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

  render (){
    let classes = this.props.classes;
    let { networks } = this.state;
    const { availNetworks } = this.props;
    // const error = Object.keys(networks).filter(v => v).length < 1

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

        <Grid item xs={10} sm={9}>
          <div className={classes.section}>
            <Typography variant="h5" gutterBottom align='left'
              className={classes.descriptionHeader} >
              Headline of your Opportunity
            </Typography>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              rowsMax="4"
              fullWidth
              value={this.props.title}
              onChange={this.handleChange('title')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
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

          <div className={classes.section}>
            <Typography variant="h5" gutterBottom align='left'
              className={classes.descriptionHeader} >
              Share this opportunity with
            </Typography>

            <FormControl required
              component="fieldset" className={classes.formControl}>
              <FormGroup>
                {fields}
              </FormGroup>
            </FormControl>
          </div>
        </Grid>

      </Grid>
    )
  }
}

export default withStyles(styles)(DescriptionField);
