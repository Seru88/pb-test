import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { CssBaseline } from '@material-ui/core';
import Layout from './Layout';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff7d08'
    },
    secondary: {
      main: '#4c5b6a',
    },
    background: {
      default: '#242e37',
      paper: '#4c5b6a'
    },
    text: {
      primary: '#fff',
      secondary: '#000'
    }
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    fontFamily: '"Catamaran", "Roboto", "Helvetica", "Arial", sans-serif'
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
