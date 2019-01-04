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
    this.state = {
      choices: industryChoices
    }
  }

  handleClick(field){
    return e => {
      e.preventDefault();
      if(this.props.need === field){
        this.props.handleChange('');
      } else {
        this.props.handleChange(field);
      }
    }
  }

  render (){
    let classes = this.props.classes;
    const { choices } = this.state;

    let cards = choices.map(need => (
      <Grid item xs={12} sm={6}>
        <Card className={classes.cardWrapper}>
          <CardActionArea className={classes.actionArea}
            onClick={this.handleClick(need)}>
            <CardContent className={classes.content}>
              <Typography variant="h6" align='center' color='inherit'>
                {need}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));

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
