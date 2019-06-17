import {
  Avatar,
  Box,
  Typography,
} from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/styles';

import Flag from 'react-world-flags';
import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  // margin: ${({ theme }) => `0 auto ${theme.spacing(1.5)}px auto`};
  border-style: solid;
  border-color: ${({ theme, selected }) =>
    selected
      ? `${theme.palette.primary.main}`
      : `${theme.palette.secondary.main}`};
  border-radius: 50%;
  border-width: 5px;
  &:hover {
    border-color: ${({ theme }) => `${theme.palette.primary.main}`};
    cursor: pointer;
  }
`;

export default ({ player }) => {
  const [selected, setSelected] = React.useState(false);
  const theme = useTheme();
  const onSelect = () => {
    setSelected(!selected);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="player-card"
        width={320}
        minHeight={200}
        m={1.25}
        p={2}
        boxShadow={3}
        borderRadius={25}
      >
        <Box className="player-info">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1.5}
          >
            <StyledAvatar
              selected={selected}
              src={player.avatarUrl}
              // can't seem to set these props with styled-components for some reason 🙁
              style={{ width: 80, height: 80 }}
              imgProps={{ align: 'left' }}
              onClick={onSelect}
            />
            <Typography
              className="nickname"
              variant="h5"
              // style={{ margin: '0 auto' }}
            >
              {player.nickname}
            </Typography>
          </Box>
          <Typography className="message" variant="caption">
            {player.message}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
