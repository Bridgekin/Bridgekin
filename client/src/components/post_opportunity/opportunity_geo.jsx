import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Grid from '@material-ui/core/Grid';

import { geographyChoices } from '../../util/choices';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  geoWrapper:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  geoHeader:{
    fontWeight: 700,
    color: theme.palette.darkGrey,
    margin: "20px 0px"
  },
  geoLabel:{
    fontSize: 22
  },
  geoCheckbox: {
  }
});

class GeoField extends React.Component {
  constructor(props){
    super(props);
    const options = this.createDefault();
    this.state = {
      options
    }
  }

  createDefault(){
    let options = {};
    for (let i = 0; i < geographyChoices.length; i++){
      options[geographyChoices[i]] = false;
    }
    return options
  }

  componentDidMount(){
    let options = this.state.options;
    let geography = this.props.geography;
    for(let i = 0; i < geography.length; i++){
      options[geography[i]] = true;
    }
    this.setState({ options })
  }

  handleChange(field){
    return e => {
      e.preventDefault();
      let { options } = this.state;
      options[field] = !options[field];
      this.setState( { options },
        () => {
          let chosenOptions = Object.keys(options).filter(k => options[k]);
          this.props.handleChange(chosenOptions);
        });
    }
  }

  render (){
    let classes = this.props.classes;
    const { options } = this.state;
    const error = Object.keys(options).filter(v => v).length < 1;

    let fields = Object.keys(options).map(option => {
      return (<FormControlLabel
        control={
          <Checkbox
            checked={options[option]}
            onChange={this.handleChange(option)}
            value={option}
            />
        }
        label={option}
        classes={{ label: classes.geoLabel }}
      />)
    })

    return (
      <Grid container className={classes.root}
        justify='flex-start' alignItems='center'>
        <Grid item xs={10} sm={11}>
          <Typography variant="h5" gutterBottom align='left'
            className={classes.geoHeader}>
            What is your geographical focus?
          </Typography>
        </Grid>
        <Grid item xs={10} sm={11}>
          <Typography variant="body2" gutterBottom align='left'
            style={{ marginTop: 20}}>
            Choose one or more options:
          </Typography>
        </Grid>

        <FormControl required error={error}
          component="fieldset" className={classes.formControl}>
          <FormGroup>
            {fields}
          </FormGroup>
          {error && <FormHelperText>Make sure to pick one</FormHelperText>}
        </FormControl>
      </Grid>
    )
  }
}

export default withStyles(styles)(GeoField);
