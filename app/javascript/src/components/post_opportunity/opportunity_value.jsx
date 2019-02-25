import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import SvgIcon from '@material-ui/core/SvgIcon';

import money from '../../static/icons/money.png';
import { valueChoices } from '../../util/choices';

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
    backgroundColor: theme.palette.grey2,
    color: theme.palette.text.tertiary
  },
  content:{
    padding: 5
  },
  valueHeader:{
    fontWeight: 700,
    color: theme.palette.darkGrey,
    margin: 20
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
});

class ValueField extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      choices: valueChoices
    }
  }

  handleClick(field){
    return e => {
      e.preventDefault();
      if(this.props.value === field){
        this.props.handleChange('');
      } else {
        this.props.handleChange(field);
      }
    }
  }

  render (){
    let classes = this.props.classes;
    const { choices } = this.state;

    let cards = choices.map(value => {
      let styling = this.props.value === value ? (
        [classes.actionArea, classes.clicked].join(' ')
      ) : (classes.actionArea);

      return (
        <Card className={classes.cardWrapper}>
          <CardActionArea className={styling}
            onClick={this.handleClick(value)}
            disableRipple>
            <CardContent className={classes.content}>
              <Typography variant="h6" align='center' color='inherit'>
                {value}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    });

    return (
      <Grid container className={classes.root}
        justify='flex-start' alignItems='center'>
        <Typography variant="h5" gutterBottom align='left'
          className={classes.valueHeader} color='secondary'>
          What's the value of your deal?
        </Typography>

        <Grid container className={classes.root}
          justify='center' alignItems='center'>
          <Grid item xs={10} sm={4}>
            {cards}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ValueField);
