import { Box } from '@material-ui/core';
import { MyContext } from '../App';
import PlayerCard from '../components/PlayerCard';
import React from 'react';
import RegionSelect from '../components/RegionSelect';
import VoteRecordedDialog from '../components/VoteRecordedDialog';
import VotingStepper from '../components/VotingStepper';
import { playersMock } from '../model/players_teams';

let initialState = JSON.parse(sessionStorage.getItem('players')) || playersMock;

function getTotalVoteCount(players) {
  return players.map(player => player.likeCount).reduce((a, b) => a + b, 0);
}

function setLikeRatio(players, totalVote) {
  return players.map(player => {
    return {
      ...player,
      likeRatio: parseFloat((player.likeCount / totalVote) * 100),
    };
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'select_region':
      let newState = initialState.filter(
        mockPlayer => mockPlayer.teams === action.payload
      );
      // Create State Properties
      const totalVote = getTotalVoteCount(newState);
      newState = newState.map(player => ({
        ...player,
        selected: false,
        disabled: false,
        likeRatio: parseFloat((player.likeCount / totalVote) * 100),
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
    case 'record_vote':
      const updatedState = state.map(player => {
        for (let i = 0; i < action.payload.length; i++) {
          if (player.participantId === action.payload[i].participantId) {
            player.likeCount = player.likeCount + 1;
          }
        }
        return player;
      });

      initialState = initialState.filter(
        player => player.teams !== updatedState[0].teams
      );
      initialState = [...updatedState, ...initialState];
      // store to "DB"
      sessionStorage.setItem('players', JSON.stringify(initialState));
      return updatedState;
    case 'reset_state':
      return null;
    default:
      return state;
  }
}

export default ({ user, onVoteSessionClose }) => {
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, null);
  const {sessionOpen} = React.useContext(MyContext);

  const selectRegion = region => {
    dispatch({ type: 'select_region', payload: region });
    setSelectedPlayers([]);
  };

  const selectPlayer = player => {
    if (user === "guest" || user === "") return;
    dispatch({ type: 'select_player', payload: player.participantId });
    setSelectedPlayers([...selectedPlayers, player]);
  };

  const deSelectPlayer = player => {
    if (user === "guest" || user === "") return;
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
    // make sure we can only submit vote if use has selected 3 players
    if (selectedPlayers.length === 3) {
      setOpen(true);
      dispatch({ type: 'record_vote', payload: selectedPlayers });
    }
  };

  const handleCloseVoteSession = () => {
    onVoteSessionClose(false);
  };

  const reset = () => {
    setOpen(false);
    dispatch({ type: 'reset_state' });
  };

  React.useEffect(() => {
    if (selectedPlayers.length === 3) {
      disableSelectionAttempt();
    } else if (selectedPlayers.length < 3) {
      enableSelectionAttempt();
    }
  }, [selectedPlayers]);

  if (sessionOpen === false && state !== null) state.sort((a,b) => b.likeCount - a.likeCount )

  return (
    <>
      <VoteRecordedDialog open={open} onClose={reset} />
      <Box className="voting-container" width="100%">
        <RegionSelect
          onSelect={selectRegion}
          players={state}
          onVotingClose={handleCloseVoteSession}
        />
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
                  selectable={user !== 'guest' && user !== '' && sessionOpen}
                />
              )).sort((a, b) => b.likeCount - a.likeCount)}
            </Box>
            {user !== 'guest' && user !== '' && sessionOpen ? (
              <VotingStepper
                players={selectedPlayers}
                onSubmit={handleVoteComplete}
              />
            ) : null}
          </>
        )}
      </Box>
    </>
  );
};
