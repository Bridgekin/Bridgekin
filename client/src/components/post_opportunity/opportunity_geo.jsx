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
    fontWeight: 700
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
    this.state = {
      options: {
        worldwide: true,
        africa: false,
        centralAmerica: false,
        easternEurope: false,
        middleEast: false,
        northAmerica: false,
        oceania: false,
        southAmerica: false,
        westernEurope: false,
      }
    }
  }

  componentDidMount(){
    let options = this.state.options;
    let keys = Object.keys(options);
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let formattedKey = this.capitalize(key);
      if(this.props.geography.includes(formattedKey)){
        options[key] = true;
      } else {
        options[key] = false;
      }
    }
    debugger
    console.log('options on didmount', options);
    this.setState({ options })
  }

  handleChange(field){
    return e => {
      e.preventDefault();
      let { options } = this.state;
      options[field] = !options[field];
      console.log('changed', options)
      this.setState( { options },
        () => {
          let chosenOptions = Object.keys(options).filter(k => options[k]);
          this.props.handleChange(chosenOptions.map(opt => this.capitalize(opt)));
        });
    }
  }

  capitalize(string) {
    let oldString = string.repeat(1);

    return oldString.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => { return str.toUpperCase(); })
  }

  render (){
    let classes = this.props.classes;
    const { options } = this.state;
    const error = Object.keys(options).filter(v => v).length < 1;

    let fields = Object.keys(options).map(option => {
      let formattedOption = this.capitalize(option);
      return (<FormControlLabel
        control={
          <Checkbox
            checked={options[option]}
            onChange={this.handleChange(option)}
            value={option} />
        }
        label={formattedOption}
        classes={{ label: classes.geoLabel }}
      />)
    })

    return (
      <div className={classes.geoWrapper}>
        <Typography variant="h4" gutterBottom align='left'
          className={classes.geoHeader} color='secondary'>
          What is your geographical focus?
        </Typography>
        <Typography variant="p" gutterBottom align='center'>
          Choose one or more options
        </Typography>

        <FormControl required error={error}
          component="fieldset" className={classes.formControl}>
          <FormGroup>
            {fields}
          </FormGroup>
          {error && <FormHelperText>Make sure to pick one</FormHelperText>}
        </FormControl>


      </div>
    )
  }
}

export default withStyles(styles)(GeoField);
