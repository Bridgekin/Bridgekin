import { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import store from '../store/store.js'
import { fade } from '@material-ui/core/styles/colorManipulator';

let theme = (siteTemplate) => createMuiTheme({
  palette: {
    primary: {
      main: (siteTemplate && siteTemplate.button1) || '#000000'
    },
    secondary: {
      main: (siteTemplate && siteTemplate.button2) || '#000000'
      // main: '#4067B2',
    },
    base1: (siteTemplate && siteTemplate.base1) || 'red',//'#FFFFFF',
    base2: (siteTemplate && siteTemplate.base2) || `rgba(0,0,0,0.05)`,
    base3: (siteTemplate && siteTemplate.base3) || 'blue', //'#FFFFFF',
    base4: (siteTemplate && siteTemplate.base4) || '#000000',
    lightGrey: "#E2E2E2",
    grey1: "#C4C4C4",
    grey2: "#999999",
    darkGrey: "#616161",
    white: "#FFFFFF",
    backgroundGrey: '#f5f5f5', //Opportunity Change
    text: {
      primary: (siteTemplate && siteTemplate.font1) || "#000000" , //black
      secondary: (siteTemplate && siteTemplate.font2) || "#616161", //grey
      // tertiary: '#FFFFFF' //white
    },
    border: {
      primary: (siteTemplate && siteTemplate.border1) || '#000000',//"#E2E2E2",
      secondary: (siteTemplate && siteTemplate.border2) || '#FFFFFF', //"#C4C4C4"
    },
    error:{
      main: '#f44336'
    },
  },
  typography:{
    fontWeight: 300,
    fontFamily: "'Muli', sans-serif",
    htmlFontSize: 16
  },
  opportunityHeadline:{
    fontWeight: 'bold',
    fontSize: '22px'
  },
  stepper: {
    // iconColor: '#4067B2' // or logic to change color
    iconColor: '#000000',
    // backgroundColor: 'none',
  },
  shape: {
    borderRadius: 3
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        // color: 'white', // Some CSS
        fontSize: '14px',
        fontWeight: 600,
        color: (siteTemplate && siteTemplate.button1) || "#000000"
      },
    },
    MuiListItem: { // Name of the component ⚛️ / style sheet
      root: {
        "&$selected": {
          backgroundColor: "#E2E2E2"
        }
      }
    },
    MuiTypography:{
      h1:{
        fontSize: 40,
        fontWeight: 600
      },
      h2: { // Used by modals for errors/confirmation
        // fontSize: 24,
        fontSize: 24,
        fontWeight: 600
      },
      h3:{ // Post Opportunity Card Headers (Needs)
        fontSize: 34,
        fontWeight: 600
      },
      h4:{ //nav tabs
        fontSize: 13,
        fontWeight: 300,
        lineHeight: 1.2
      },
      h5: { // Opportunity Header
        fontSize: 22,
        fontWeight: 600
      },
      h6: { // Opportunity Categories
        fontSize: 18,
        fontWeight: 600,
        // color: "#999999"
      },
      subtitle1: { // Opportunity Tags
        fontSize: 14,
        fontWeight: 600
      },
      subtitle2: { // Terms and conditions
        fontSize: 12,
        fontWeight: 300
      },
      body1: {
        fontSize: 18,
      },
      body2: { // Opportunity Description
        fontSize: 15,
        fontWeight: 300,
        lineHeight: 1.2
      }
    },
    MuiStepLabel: {
      label: {
        color: '#000000',
        fontSize: 14
      },
    },
    MuiCheckbox:{
      root: 'red'
    },
    MuiFormControlLabel:{
      label: {
        fontSize: 15,
        fontWeight: 300
      }
    },
    MuiListItemText:{
      primary:{
        fontSize: 15,
        fontWeight: 600,
        color: "#000000"
      },
      secondary:{
        fontSize: 15,
        fontWeight: 300,
        color: "#000000"
      }
    },
    MuiMenuItem: {
      root: {
        '&$selected':{
          backgroundColor: 'white',
        },
        // '&:hover': {
        //   backgroundColor: 'white'
        // },
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: 'white'
        }
      }
    }
  }
});

export default theme;
