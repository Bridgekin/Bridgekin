import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#4067B2'
    },

    delete: '#f44336',
    text: {
      primary: "#000"
    }
  },
  typography:{
    fontWeight: 300,
    fontFamily: "'Nunito', sans-serif",
    color: 'black'
  },
  stepper: {
    iconColor: '#4067B2' // or logic to change color

  }
});
