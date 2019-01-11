import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import SvgIcon from '@material-ui/core/SvgIcon';

import { industryChoices } from '../../util/choices';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardWrapper:{
    margin: '10px 20px 10px 20px',
    width: '80%'
  },
  actionArea:{
    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  clicked:{
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main
  },
  content:{
    padding: 5
  },
  industryHeader:{
    fontWeight: 700,
  },
  cardGrid:{
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class IndustryField extends React.Component {
  constructor(props){
    super(props);
    const options = this.createDefault();
    this.state = {
      options
    }
  }

  createDefault(){
    let options = {};
    for (let i = 0; i < industryChoices.length; i++){
      options[industryChoices[i]] = false;
    }
    return options
  }

  componentDidMount(){
    let options = this.state.options;
    // let keys = Object.keys(options);
    // for(let i = 0; i < keys.length; i++) {
    //   let key = keys[i];
    //   // let formattedKey = this.capitalize(key);
    //   if(this.props.industries.includes(key)){
    //     options[key] = true;
    //   } else {
    //     options[key] = false;
    //   }
    // }
    let industries = this.props.industries;
    for(let i = 0; i < industries.length; i++){
      options[industries[i]] = true;
    }
    this.setState({ options })
  }

  handleClick(field){
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

    let cards = Object.keys(options).map(option => {
      let styling = options[option] ? (
        [classes.actionArea, classes.clicked].join(' ')
      ) : (classes.actionArea);

      return (
        <Grid item xs={12} sm={6}>
          <Card className={classes.cardWrapper}>
            <CardActionArea className={styling}
              onClick={this.handleClick(option)}>
              <CardContent className={classes.content}>
                <Typography variant="h6" align='center' color='inherit'>
                  {option}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      )
    });

    return (
      <Grid container className={classes.root}
        justify='flex-start' alignItems='center'>
        <Typography variant="h4" gutterBottom align='left'
          className={classes.industryHeader} color='secondary'>
          In which industries are the product/service you want to find?
        </Typography>
        <Grid container className={classes.root}
          justify='center' alignItems='center'>
        {cards}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(IndustryField);
