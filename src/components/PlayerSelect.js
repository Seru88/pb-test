import styled, { ThemeProvider } from 'styled-components';

import { Box } from '@material-ui/core';
import PlayerCard from './PlayerCard';
import React from 'react';
import { useTheme } from '@material-ui/styles';

const intialState = [];

function reducer(state, action) {
  if (action.type === 'select_player') {
    const newState = [...state, action.payload]
    return newState;
  } else if (action.type === 'unselect_player') {
    return state.filter(player => player.owner !== action.payload.owner)
  }
}

export default ({ players, onSelect }) => {
  const [state, dispatch] = React.useReducer(reducer, intialState);
  const theme = useTheme();
  const selectPlayerHandler = player => {
    dispatch({type: 'select_player', payload: player})
  }
  const unselectPlayerHandler = player => {
    dispatch({type: 'unselect_player', payload: player})
  }
  React.useEffect(() => {
    if (state.length > 0) {
      onSelect(state);
    }
  }, [state])
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {players.map(player => (
          <PlayerCard
            key={player.owner}
            player={player}
            onSelect={selectPlayerHandler}
            onDeselect={unselectPlayerHandler}
          />
        ))}
      </Box>
    </ThemeProvider>
  );
};
