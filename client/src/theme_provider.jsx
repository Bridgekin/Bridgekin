import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import GAListener from './components/ga_listener';
import App from './App';

import { MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from './components/theme';

import InviteModal from './components/modals/invite_modal';
import CreateCircleModal from './components/modals/create_circle_modal';
import CircleModal from './components/modals/circle_modal';
import CustomEmailModal from './components/modals/custom_email_modal';
import WaitlistModal from './components/modals/waitlist_modal';
import OppCardModal from './components/modals/card_modal';
import UpdateUserModal from './components/modals/update_user_modal';

const mapStateToProps = state => ({
  siteTemplate: state.siteTemplate,
  currentUser: state.users[state.session.id]
});

class ThemeProvider extends React.Component{
  render(){
    const { currentUser, siteTemplate } = this.props;
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
              <OppCardModal/>
              <UpdateUserModal/>
            </div>}
            <WaitlistModal/>

          </GAListener>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, {})(ThemeProvider);
