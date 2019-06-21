import { Box, Grid, Typography } from '@material-ui/core';

import PlayerCard from '../components/PlayerCard';
import React from 'react';
import RegionSelect from '../components/RegionSelect';
import VoteRecordedDialog from '../components/VoteRecordedDialog';
import VotingStepper from '../components/VotingStepper';
import { playersMock } from '../model/players_teams';

function getTotalVoteCount(players) {
  return players.map(player => player.likeCount).reduce((a, b) => a + b, 0);
}

function reducer(state, action) {
  switch (action.type) {
    case 'select_region':
      let newState = playersMock.filter(
        mockPlayer => mockPlayer.teams === action.payload
      );
      // Create State Properties
      const totalVote = getTotalVoteCount(newState);
      newState = newState.map(player => ({
        ...player,
        selected: false,
        disabled: false,
        likeCount: `${((player.likeCount / totalVote) * 100).toFixed(2)}%`,
      }));
      return newState;
    case 'select_player':
      return state.map(mockPlayer => {
        if (mockPlayer.participantId === action.payload) {
          mockPlayer.selected = true;
        }
        return mockPlayer;
      });
    case 'deselect_player':
      return state.map(mockPlayer => {
        if (mockPlayer.participantId === action.payload) {
          mockPlayer.selected = false;
          return mockPlayer;
        }
        return mockPlayer;
      });
    case 'disable_selection_attempt':
      return state.map(mockPlayer => {
        if (!mockPlayer.selected) {
          mockPlayer.disabled = true;
        }
        return mockPlayer;
      });
    case 'enable_selection_attempt':
      if (state === null) return state;
      return state.map(mockPlayer => {
        mockPlayer.disabled = false;
        return mockPlayer;
      });
    case 'reset_state': 
      return null;
    default:
      return state;
  }
}

export default () => {
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, null);

  const selectRegion = region => {
    dispatch({ type: 'select_region', payload: region });
    setSelectedPlayers([]);
  };

  const selectPlayer = player => {
    dispatch({ type: 'select_player', payload: player.participantId });
    setSelectedPlayers([...selectedPlayers, player]);
  };

  const deSelectPlayer = player => {
    dispatch({ type: 'deselect_player', payload: player.participantId });
    setSelectedPlayers(
      selectedPlayers.filter(
        subject => subject.participantId !== player.participantId
      )
    );
  };

  const enableSelectionAttempt = () => {
    dispatch({ type: 'enable_selection_attempt' });
  };

  const disableSelectionAttempt = () => {
    dispatch({ type: 'disable_selection_attempt' });
  };

  const handleVoteComplete = () => {
    setOpen(false);
    dispatch({type: 'reset_state'})
  };

  React.useEffect(() => {
    if (selectedPlayers.length === 3) {
      disableSelectionAttempt();
    } else if (selectedPlayers.length < 3) {
      enableSelectionAttempt();
    }
  }, [selectedPlayers]);

  return (
    <>
      <VoteRecordedDialog open={open} onClose={handleVoteComplete} />
      <Box className="voting-container" width="100%">
        {/* <Typography variant="subtitle2" align="center" color="textPrimary">
        Select your region to browse players.
      </Typography> */}
        {/* <Typography variant="subtitle2" align="center" color="textPrimary">
        NOTE. You may only vote for one region.
      </Typography> */}
        <RegionSelect onSelect={selectRegion} />
        {state && (
          <>
            <Box
              className="player-select-box"
              p={2}
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center"
            >
              {state.map(player => (
                <PlayerCard
                  key={player.owner}
                  player={player}
                  onSelect={selectPlayer}
                  onDeselect={deSelectPlayer}
                />
              ))}
            </Box>
            <VotingStepper
              players={selectedPlayers}
              onSubmit={handleVoteComplete}
            />
          </>
        )}
      </Box>
    </>
  );
};
