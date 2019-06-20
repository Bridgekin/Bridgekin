import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Loading from '../loading';
import PersonIcon from '@material-ui/icons/PersonSharp';

import { fetchSalesIntro } from '../../actions/sales_intro_actions';
import { openLogin, openRespondToRequest } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  introId: parseInt(ownProps.match.params.introId),
  salesIntros: state.entities.sales.salesIntros,
  salesContacts: state.entities.sales.salesContacts
});

const mapDispatchToProps = dispatch => ({
  fetchSalesIntro: introId => dispatch(fetchSalesIntro(introId)),
  openLogin: payload => dispatch(openLogin(payload)),
  openRespondToRequest: response => dispatch(openRespondToRequest(response))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
  actionButton:{
    padding: "5px 15px"
  },
  defaultProfilePic: {
    height: 'auto',
    width: '70%',
    color: 'white'
  },
  profileContainer:{
    width: 155,
    height: 155,
    borderRadius: '50%',
    backgroundColor: `grey`,
    margin: "20px 0px 30px"
  }
})

class RespondToIntro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    const { introId } = this.props;
    this.props.fetchSalesIntro(introId)
    .then(() => {
      const { salesIntros, currentUser } = this.props;
      let intro = salesIntros[introId];
      if (!currentUser){
        this.props.openLogin({ 
          page: 'login',
          message: `**You must login to view this introduction request**`,
          redirectFailure: '/sales'
        });
      }
      this.setState({ loaded: true })
    })
  }

  respondToRequest(decision){
    return e => {
      if(decision === 'unknown'){
        // this.props.respondToRequest()
      } else {
        const { introId } = this.props;
        let response = { decision, introId };
        this.props.openRespondToRequest(response)
      }
    }
  }

  render() {
    const { classes, currentUser, 
      dimensions, salesIntros, salesContacts,
      introId } = this.props
    const { loaded } = this.state;

    if (loaded){
      let contact = salesContacts[salesIntros[introId].contactId]

      let contactComp = <Grid container justify='center'>
        <Grid item xs={10} sm={8}>
          <Typography align='center' gutterBottom
          style={{ fontSize: 22, fontWeight: 600}}>
            {`Make referrals and help you and your company grow`}
          </Typography>
          <Typography align='center' gutterBottom
          style={{ fontSize: 16 }}>
            {`The solution is a good fit because it would increase their sales by 15%.`}
          </Typography>

          <Grid container justify='center'
          style={{ margin: "20px 0px"}}>
            <Grid item xs={8} sm={6} 
            container alignItems='center'
            direction='column'
            style={{ padding: "15px 0px "}}>
              <Grid container justify='center' 
              alignItems='center' item
              className={classes.profileContainer}>
                <PersonIcon
                  className={classes.defaultProfilePic}/>
              </Grid>
              <Typography align='center' 
              gutterBottom 
              style={{ fontSize: 18}}>
                {`${contact.fname} ${contact.lname}`}
              </Typography>
              <Typography align='center' 
              color='textSecondary'
                style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {`${contact.position}`}
              </Typography>
              <Typography align='center' 
                color='textSecondary'
                style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {`${contact.company || "Unknown Company"}`}
              </Typography>
              <div style={{width:'65%', borderTop:`1px solid grey`, margin: "15px 0px" }}/>
              <Typography align='center' 
                color='textPrimary'
                style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {`${contact.location || "Unknown Location"}`}
              </Typography>
            </Grid>
            <Grid></Grid>
          </Grid>

          <Grid container justify='center'>
            <Grid item xs={8} container justify='space-around'>
              <Button color='primary' variant='contained'
                onClick={this.respondToRequest('yes')}
                className={classes.actionButton}>
                {`Intro`}
              </Button>
              <Button color='primary' variant='contained'
                onClick={this.respondToRequest('unknown')}
                className={classes.actionButton}>
                {`Don't know`}
              </Button>
              <Button color='primary' variant='contained'
                onClick={this.respondToRequest('no')}
                className={classes.actionButton}>
                {`I'd prefer not to reach out`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      let messageComp = <Grid container justify='center'>
        <div></div>
      </Grid>

      return <div style={{minHeight: dimensions.height}}>
        <Grid container className={classes.grid}>
          {contactComp}
          {messageComp}
        </Grid>
      </div>
    } else {
      return (
        <Grid container justify='center' alignItems='center'
        style={{ minHeight: dimensions.height}}>
          <Loading />
        </Grid>
      )
    }
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RespondToIntro));
