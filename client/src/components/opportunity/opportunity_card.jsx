import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import castlePic from '../../static/castle.jpg';

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  cover: {
    height: 150,
    width: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 50
  },
  content:{
    padding: 25
  },
  cardWrapper:{
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40
  },
  cardSubContent:{
    fontSize: 18,
    fontWeight: 700
  }
});


class OpportunityCard extends React.Component {
  constructor(props){
    super(props)

    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen(e){
    e.preventDefault();
    this.props.handleCardOpen(this.props.opportunity)
  }
  render(){
    const { classes }= this.props;

    return (
    <Card className={classes.card}>
      <CardActionArea onClick={this.handleOpen}>
        <CardMedia
          className={classes.cover}
          image={castlePic}
          title="CastlePicture"
        />
        <CardContent className={classes.content}>
          <Typography variant="h4" gutterBottom align='center'
            color="default">
            Tuscan Castle surrounded by 30+ acres of vineyards and olive
            groves seekings buyer
          </Typography>
          <Typography variant="h6" gutterBottom align='center'
            color="default">
            Historically refurbished 33,000 sq ft castle in the heart
            of the Tuscan countryside. Off the market property considered
            the Crown of Ireland!
          </Typography>

          <div className={classes.cardWrapper}>
            <div>
              <Typography variant="h2" gutterBottom align='center'
                color="secondary" className={classes.cardSubContent}>
                Geography
              </Typography>
              <Typography variant="h2" gutterBottom align='center'
                color="default" className={classes.cardSubContent}>
                Italy
              </Typography>
            </div>

            <div>
              <Typography variant="h2" gutterBottom align='center'
                color="secondary" className={classes.cardSubContent}>
                Industry
              </Typography>
              <Typography variant="h2" gutterBottom align='center'
                color="default" className={classes.cardSubContent}>
                Real Estate & Housing
              </Typography>
            </div>

            <div>
              <Typography variant="h2" gutterBottom align='center'
                color="secondary" className={classes.cardSubContent}>
                Value
              </Typography>
              <Typography variant="h2" gutterBottom align='center'
                color="default" className={classes.cardSubContent}>
                Over 25M
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    )
  }
}

export default withStyles(styles)(OpportunityCard);
