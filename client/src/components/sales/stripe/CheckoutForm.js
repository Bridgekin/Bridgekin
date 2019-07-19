import React, {Component} from 'react';
import { connect } from 'react-redux';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { receiveUserErrors } from '../../../actions/error_actions';
import { openSignup } from '../../../actions/modal_actions'

import Img from 'react-image'
import StripeBadge from '../../../static/Stripe badge/Outline Dark/powered_by_stripe.png';

const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
  receiveUserErrors: (errors) => dispatch(receiveUserErrors(errors)),
  openSignup: payload => dispatch(openSignup(payload))
});

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      submitting: false,
      msa: false,
      termsAgreement: false
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async submit(ev) {
    this.setState({ submitting: true })
    let {token} = await this.props.stripe.createToken({name: "Name"});
    
    if(token){
      this.props.handleSubmit(token.id)
    } else {
      this.props.receiveUserErrors(["Card information wasn't accepted"])
      this.props.openSignup({ page: 'response'})
      this.setState({ submitting: false})
    }
  }

  handleChange(field){
    return e => this.setState({ [field]:  e.target.checked })
  }

  render() {
    const { submitting, msa, termsAgreement } = this.state;
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    
    return (
      <div className="checkout">
        <div style={{ margin: "20px 0px"}}>
          <CardElement />
        </div>

        <Button color='primary' variant='contained'
          disabled={this.props.canSubmit() || submitting || !termsAgreement}
          onClick={this.submit} fullWidth
          style={{textTransform: 'capitalize', marginTop: 10}}>
          {`Start Free 7 Day Trial`}
          {submitting  && <CircularProgress size={34}
          style={{ position: 'absolute', top: 0, color: 'grey'}}/>}
        </Button>
        <Grid container justify='center' style={{ marginTop: 10 }}>
          <Img src={StripeBadge} />
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));