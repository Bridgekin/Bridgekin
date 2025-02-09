import React from 'react';
import ReactGA from 'react-ga';
import { PropTypes } from 'prop-types';

ReactGA.initialize('UA-133818078-1');

const dev = process.env.NODE_ENV === 'development';

class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    // this.sendPageView(this.context.router.history.location);
    if(!dev){
      this.context.router.history.listen(this.sendPageView);
    }
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default GAListener;
