import { Avatar, Box, Card, Typography } from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/styles';

import Flag from 'react-world-flags';
import React from 'react';
import styled from 'styled-components';

const PlayerCard = styled(Card)`
  width: 180px;
  height: 380px;
  margin: ${({ theme }) => `${theme.spacing(0.5)}px`};
`;

const PlayerAvatar = styled(Avatar)`
  margin: ${({ theme }) => `0 auto ${theme.spacing(1.5)}px auto`};
  border-style: solid;
  border-color: ${({ theme, selected }) =>
    selected
      ? `${theme.palette.primary.main}`
      : `${theme.palette.secondary.main}`};
  border-radius: 50%;
  border-width: 5px;
  :hover {
    border-color: ${({ theme}) => `${theme.palette.primary.main}`};
    cursor: pointer
  }
`;

export default ({ player }) => {
  const [selected, setSelected] = React.useState(false);
  const theme = useTheme();
  const onSelect = () => {
    setSelected(!selected)
  }
  return (
    <ThemeProvider theme={theme}>
      <PlayerCard color="primary">
        <Box p={1}>
          <PlayerAvatar
            selected={selected}
            src={player.avatarUrl}
            // can't set these properties with styled-components for some reason 🙁
            style={{ width: 80, height: 80 }}
            onClick={onSelect}
          />
          <Typography
            className="nickname"
            align="center"
            variant="body1"
            gutterBottom
          >
            {player.nickname}
            {` `}
            <Flag code={player.country} height={11} width={16} />
          </Typography>
          <Typography className="message" align="center" variant="caption">
            {player.message}
          </Typography>
        </Box>
      </PlayerCard>
    </ThemeProvider>
  );
};
