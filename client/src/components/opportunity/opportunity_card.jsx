import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import castlePic from '../../static/castle.jpg';
import Button from '@material-ui/core/Button';

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
    paddingBottom: 25,
    minHeight: 400
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
  },
  title: {fontSize: 26},
  description: {fontSize: 14},
  buttonWrapper:{
    display: 'flex',
    justifyContent: 'space-around'
  },
  button: {
    minWidth: 75,
    margin: 25,
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
    const { classes, opportunity, editable }= this.props;
    let { title, description, industries, opportunityNeeds, geography,
      value, networks, status } = opportunity;

    if (opportunity.id){
      let industry = industries.join(', ');
      geography = geography.join(', ');

      let additionalInfo = editable ? (
        <div className={classes.cardWrapper}>
          <div>
            <Typography variant="h2" gutterBottom align='center'
              color="secondary" className={classes.cardSubContent}>
              Status
            </Typography>
            <Typography variant="h2" gutterBottom align='center'
              color="default" className={classes.cardSubContent}>
              {status}
            </Typography>
          </div>

          <div>
            <Typography variant="h2" gutterBottom align='center'
              color="secondary" className={classes.cardSubContent}>
              Opportunity Need
            </Typography>
            <Typography variant="h2" gutterBottom align='center'
              color="default" className={classes.cardSubContent}>
              {opportunityNeeds}
            </Typography>
          </div>
        </div>
      ): (<div></div>)

      let editOptions = editable ? (
        <div className={classes.buttonWrapper}>
          <Button variant="contained" className={classes.button}>
            Edit
          </Button>
          <Button variant="contained" className={classes.button}
            onClick={this.props.handleDelete(opportunity.id)}>
            Delete
          </Button>
        </div>
      ) : (<div></div>)

      return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleOpen}>
          <CardMedia
            className={classes.cover}
            image={castlePic}
            title="CastlePicture"
          />
          <CardContent className={classes.content}>
            <Typography variant="h2" gutterBottom align='center'
              color="default" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="p" gutterBottom align='center'
              color="default" className={classes.description}>
              {description}
            </Typography>

            <div className={classes.cardWrapper}>
              <div>
                <Typography variant="h2" gutterBottom align='center'
                  color="secondary" className={classes.cardSubContent}>
                  Geography
                </Typography>
                <Typography variant="h2" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  {geography}
                </Typography>
              </div>

              <div>
                <Typography variant="h2" gutterBottom align='center'
                  color="secondary" className={classes.cardSubContent}>
                  Industry
                </Typography>
                <Typography variant="h2" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  {industry}
                </Typography>
              </div>

              <div>
                <Typography variant="h2" gutterBottom align='center'
                  color="secondary" className={classes.cardSubContent}>
                  Value
                </Typography>
                <Typography variant="h2" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  {value}
                </Typography>
              </div>
            </div>
            {editable && additionalInfo}
          </CardContent>
        </CardActionArea>
        {editable && editOptions}
      </Card>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default withStyles(styles)(OpportunityCard);
