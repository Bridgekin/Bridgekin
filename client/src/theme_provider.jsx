import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import GAListener from './components/ga_listener';
import App from './App';

import { MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from './components/theme';
import { receiveHeight } from './actions/util_actions';
import debounce from 'lodash/debounce';

import InviteModal from './components/modals/invite_modal';
import CreateCircleModal from './components/modals/create_circle_modal';
import CircleModal from './components/modals/circle_modal';
import CustomEmailModal from './components/modals/custom_email_modal';
import WaitlistModal from './components/modals/waitlist_modal';
import OppCardModal from './components/modals/card_modal';
import UpdateUserModal from './components/modals/update_user_modal';
import DirectLinkModal from './components/modals/direct_link_modal';

const mapStateToProps = state => ({
  siteTemplate: state.siteTemplate,
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  receiveHeight: height => dispatch(receiveHeight(height))
});

class ThemeProvider extends React.Component{
  constructor(props) {
    super(props);
    this.state = { windowHeight: window.innerHeight };
    this.resizer = this.resizer.bind(this)
  }

  componentDidMount(){
    let resizeFn = debounce(this.resizer, 400)
    window.addEventListener('resize', resizeFn);
  }

  resizer(){
    this.props.receiveHeight(window.innerHeight)
    // this.setState({ windowHeight: window.innerHeight })
  }

  render(){
    const { currentUser, siteTemplate } = this.props;
    // const { windowHeight } = this.state;

    return (
      <MuiThemeProvider theme={getTheme(siteTemplate)}>
        <BrowserRouter>
          <GAListener>
            <App />

            {/* MODALS */}
            {currentUser && <div>
              <InviteModal/>
              <CreateCircleModal/>
              <CircleModal/>
              <CustomEmailModal/>
              <UpdateUserModal/>
              <DirectLinkModal/>
            </div>}
            <OppCardModal/>
            <WaitlistModal/>

          </GAListener>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
