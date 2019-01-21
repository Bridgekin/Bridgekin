import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
// import SvgIcon from '@material-ui/core/SvgIcon';

import { needsChoices } from '../../util/choices';
import { PickIcons } from '../../static/opportunity_images/image_util';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardWrapper:{
    margin: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  actionArea:{
    display: 'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingLeft: 10,
    height: 100
  },
  clicked:{
    backgroundColor: theme.palette.grey2,
    color: theme.palette.text.tertiary
  },
  clickedIcon:{
    webkitFilter: 'invert(100%)',
    filter: 'invert(100%)'
  },
  content:{
    width: '80%',
    padding: '17px 0px 17px 9px'
  },
  icon:{
    height: 'auto',
    width: '100%',
    maxHeight: 90,
    maxWidth: 90
  },
  needsHeader:{
    fontWeight: 700,
    margin: 20
  }
});

class NeedsField extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      choices: needsChoices
    }
  }

  handleClick(field){
    return e => {
      e.preventDefault();
      if(this.props.opportunityNeed === field){
        this.props.handleChange('');
      } else {
        this.props.handleChange(field);
      }
    }
  }

  getIcon(field){
    // switch(field){
    //   case('Find'):
    //     return <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    //   case('Sell'):
    //     return <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    //   case('Raise Capital'):
    //     return <path d="M9.56 8.1c-1.6-.51-2.66-.71-2.66-1.88 0-.83.72-1.62 2.1-1.62 1.59 0 2.1.88 2.1 1.94H13c0-1.79-1.17-3.09-3-3.44V1H8v2.11c-1.58.32-3 1.37-3 3.12 0 2.25 1.78 2.8 4 3.52 1.88.61 2.25 1.04 2.25 2.09 0 .9-.67 1.56-2.25 1.56-1.2 0-2.25-.84-2.25-2.06h-2c0 1.88 1.38 3.2 3.25 3.56V17h2v-2.07c2.04-.29 3.2-1.49 3.2-3.1 0-1.87-.94-2.87-3.64-3.73z" />
    //   case('Invest Capital'):
    //     return <path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z" />
    //   case('Discover'):
    //     return <path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
    //   case('Other'):
    //     return <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    //   default:
    //     return <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    // }

  }

  render (){
    let classes = this.props.classes;
    const { choices } = this.state;

    console.log('need', this.props.opportunityNeed)
    // const error = Object.keys(options).filter(v => v).length < 1;

    // let fields = Object.keys(options).map(option => {
    //   let formattedOption = this.capitalize(option);
    //   return (<FormControlLabel
    //     control={
    //       <Checkbox
    //         checked={options[option]}
    //         onChange={this.handleChange(option)}
    //         value={option} />
    //     }
    //     label={formattedOption}
    //     classes={{ label: classes.geoLabel }}
    //   />)
    // })
    let subtitles = {
      'Find': (
      <Typography variant="subtitle2" align='left'
        color='inherit'>
        properties, companies, or products
      </Typography>),
      'Sell': (
      <Typography variant="subtitle2" gutterBottom align='left'
        color='inherit'>
        properties, companies, or products
      </Typography>),
      'Discover': (
      <Typography variant="subtitle2" gutterBottom align='left'
        color='inherit'>
        new team members or join a team
      </Typography>)
    }

    let cards = choices.map(need => {

      let styling = this.props.opportunityNeed === need ? (
        [classes.actionArea, classes.clicked].join(' ')
      ) : (classes.actionArea);

      let iconStyling = this.props.opportunityNeed === need ? (
        [classes.icon, classes.clickedIcon].join(' ')
      ) : (classes.icon);

      // <Grid item xs={3}>
      //   <img
      //     src={PickIcons(need)}
      //     className={iconStyling}
      //     alt={'icon'}
      //     />
      // </Grid>

      return (
      <Grid item xs={11} sm={6} lg={4}>
        <Card className={classes.cardWrapper}>
          <CardActionArea className={styling}
            onClick={this.handleClick(need)}
            disableRipple>

            <Grid container justify='center' alignItems='center'>
              <Grid item xs={10}>
                <Typography variant="h3" align='left' color='inherit'
                  style={{ wordWrap: 'break-word' }}>
                  {need.toUpperCase()}
                </Typography>
                {subtitles[need]}
              </Grid>
            </Grid>

          </CardActionArea>
        </Card>
      </Grid> )
    });

    return (
      <Grid container className={classes.root}
        justify='flex-start' alignItems='center'>
        <Typography variant="h2" gutterBottom align='left'
          className={classes.needsHeader} color='secondary'>
          What are your business needs?
        </Typography>
        <Grid container className={classes.root}
          justify='center' alignItems='center'>
          {cards}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(NeedsField);
