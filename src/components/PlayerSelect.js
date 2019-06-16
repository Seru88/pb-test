import { Box, Button, Grid } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import PlayerCard from './PlayerCard';
import React from 'react';
import { useTheme } from '@material-ui/styles';

export default ({players}) => {
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const theme = useTheme();
  const selectPlayer = player => {
    setSelectedPlayers(selectedPlayers => selectedPlayers.push(player))
  }
  React.useEffect(() => {
    if (selectedPlayers.length === 3) {
    
    }
  }, [selectedPlayers])
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexWrap="wrap" justifyContent="center" >
        {players.map(player => (
          <PlayerCard player={player} onClick={selectPlayer}/>
        ))}
      </Box>
    </ThemeProvider>
  );
};
