import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { CssBaseline } from '@material-ui/core';
import Layout from './Layout';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff7d08'
    },
    secondary: {
      main: '#47515d',
    },
    background: {
      default: '#23292f',
      paper: blueGrey['900']
    },
    text: {
      primary: '#fff'
    }
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});

// generate responsive font sizes.
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
