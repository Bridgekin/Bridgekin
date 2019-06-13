import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Img from 'react-image'

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networkMembers: {}
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  connectedMember:{
    borderRadius: '50%',
    height: 31, width: 31
  }, 
  pictureCover: {
    height: 140,
    width: '100%',
    objectFit: 'cover',
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`
  },
})

class ResultCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes, contact, networkMembers } = this.props;
    return <Grid item xs={12} sm={5} container>
      <Grid container
      style={{ height: 130}}>
        <Grid item xs={3}>
          {`Profile Pic`}
        </Grid>
        <Grid item xs={9}
        style={{ padding: 16}}>
          <Typography color='textPrimary'
          style={{ fontSize: 18, textTransform: 'capitalize'}}>
            {`${contact.fname} ${contact.lname}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify='flex-end'>
        {contact.connectedMembers.map(id => {
          let member = networkMembers[id];
          return <div 
          className={classes.connectedMember}>
            <Img src={member.profilePicUrl}
              className={classes.pictureCover}/>
          </div>
        }) }
        <Button color='primary' variant='contained'
        style={{ textTransform: 'capitalize'}}>
          {`Request a warm intro`}
        </Button>
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultCard));
