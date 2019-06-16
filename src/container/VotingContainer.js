import { Box, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import PlayerSelect from '../components/PlayerSelect';
import React from 'react';
import RegionSelect from '../components/RegionSelect';
import { playersMock } from '../model/players_teams';

export default () => {
  const [region, setRegion] = React.useState('sea');
  const playersToVote = playersMock.filter(player => player.teams === region)
  return (
    <Box className="voting-container" width="100%">
      <Typography variant="subtitle2" align="center" color="textPrimary">
        Select your region to browse players.
      </Typography>
      <Typography variant="subtitle2" align="center" color="textPrimary">
        NOTE. You may only vote for one region.
      </Typography>
      <RegionSelect setRegion={setRegion} />
      <PlayerSelect players={playersToVote}/>
    </Box>
  );
};
