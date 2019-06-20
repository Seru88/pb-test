import { Box, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import PlayerSelect from '../components/PlayerSelect';
import React from 'react';
import RegionSelect from '../components/RegionSelect';
import VotingStepper from '../components/VotingStepper';
import { playersMock } from '../model/players_teams';

function getTotalVoteCount(players) {
  return players.map(player => player.likeCount).reduce((a, b) => a + b, 0);
}

export default () => {
  const [region, setRegion] = React.useState('');
  const [selectedPlayers, setSelectedPlayers] = React.useState([])
  
  let playersToVote = playersMock.filter(player => player.teams === region);
  const totalVote = getTotalVoteCount(playersToVote);
  playersToVote = playersToVote.map(player => ({
    ...player,
    likeCount: `${(player.likeCount / totalVote * 100).toFixed(2)}%`,
  }));

  return (
    <Box className="voting-container" width="100%">
      {/* <Typography variant="subtitle2" align="center" color="textPrimary">
        Select your region to browse players.
      </Typography> */}
      {/* <Typography variant="subtitle2" align="center" color="textPrimary">
        NOTE. You may only vote for one region.
      </Typography> */}
      <RegionSelect setRegion={setRegion} />
      <PlayerSelect players={playersToVote} onSelect={setSelectedPlayers}/>
      {region !== '' && <VotingStepper candidates={selectedPlayers} />}
    </Box>
  );
};
