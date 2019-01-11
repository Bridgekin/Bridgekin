import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#4067B2'
    },
    error:{
      main: '#f44336'
    },
    delete: '#f44336',
    text: {
      primary: "#000"
    }
  },
  typography:{
    fontWeight: 300,
    fontFamily: "'Nunito', sans-serif",
    color: 'black',
    htmlFontSize: 18
  },
  stepper: {
    iconColor: '#4067B2' // or logic to change color
  },
  // htmlFontSize: 10
  // pxToRem: () => {
  //
  // }
});
//
// const { breakpoints, typography: { pxToRem } } = theme
//
// let options = {
//   h1: 96,
//   h2: 60,
//   h3: 48,
//   h4: 34,
//   h5: 24,
//   h6: 20,
//   subtitle1: 16,
//   subtitle2: 14,
//   body1Next: 16,
//   body2Next: 14,
//   buttonNext: 14,
//   captionNext: 12,
//   overline: 12
// }
//
// theme = {
//   ...theme,
//   overrides: {
//     MuiTypography: {
//       htmlFontSize: 10
//     }
//   }
// }

// theme = {
//   ...theme,
//   overrides: {
//     MuiTypography: {
//       h2: {
//         fontSize: pxToRem(24),
//         [breakpoints.up("md")]: {
//           fontSize: pxToRem(32)
//         }
//       }
//     }
//   }
// }



export default theme;
