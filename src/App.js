import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { Box } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import UserSelectDialog from './components/UserSelectDialog';
import Username from './components/Username';
import VotingContainer from './container/VotingContainer';
import useStateWithSessionStorage from './hooks/useStateWithLocalStorage';

export const MyContext = React.createContext();

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff7d08',
    },
    secondary: {
      main: '#4c5b6a',
    },
    background: {
      default: '#242e37',
      paper: '#4c5b6a',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element.
    htmlFontSize: 10,
    fontFamily: '"Catamaran", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// generate responsive font sizes.
theme = responsiveFontSizes(theme);

function App() {
  const [user, setUser] = useStateWithSessionStorage('user');
  const [sessionOpen, setSessionOpen] = useStateWithSessionStorage(
    'sessionOpen'
  );

  const [open, setOpen] = React.useState(false);
  const handleSetUser = user => {
    setUser(user);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyContext.Provider
        value={{
          user: user === '' ? 'guest' : user,
          sessionOpen: sessionOpen === '' ? true : JSON.parse(sessionOpen),
          setSessionOpen: setSessionOpen,
        }}
      >
        <UserSelectDialog
          open={open}
          onSelect={handleSetUser}
          onClose={setOpen}
        />
        <Box>
          <Header live={sessionOpen === '' ? true : JSON.parse(sessionOpen)} />
          <main>
            <Username onClick={setOpen} />
            <VotingContainer user={user} onVoteSessionClose={setSessionOpen} />
          </main>
        </Box>
      </MyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
