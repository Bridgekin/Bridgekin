import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Img from 'react-image'
import StripeBadge from '../../../static/Stripe badge/Outline Dark/powered_by_stripe.png';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    
    if(token){
      this.props.handleSubmit(token.id)
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    
    return (
      <div className="checkout">
        <div style={{ margin: "20px 0px"}}>
          <CardElement />
        </div>
        <Button color='primary' variant='contained'
        fullWidth
          disabled={this.props.canSubmit()}
          onClick={this.submit}>
          {`Start Free 7 Day Trial`}
        </Button>
        <Grid container justify='center' style={{ marginBottom: 10 }}>
          <Img src={StripeBadge} />
        </Grid>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);