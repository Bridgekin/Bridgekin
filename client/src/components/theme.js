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
    } // Indigo is probably a good match with pink
  },
  typography:{
    fontWeight: 300,
    fontFamily: "'Quicksand', sans-serif",
    color: 'black'
  }
});
