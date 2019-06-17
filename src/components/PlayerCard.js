import { Avatar, Box } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Flag from 'react-world-flags';
import React from 'react';
import { useTheme } from '@material-ui/styles';

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
        maxHeight={200}
        m={1.25}
        p={2}
        boxShadow={3}
        borderRadius={25}
        bgcolor="background.paper"
        position="relative"
      >
        <Box
          className="selection-checkmark"
          display={selected ? 'block' : 'none'}
          width={40}
          height={40}
          borderRadius={25}
          bgcolor="#fff"
          position="absolute"
          top={-10}
          left={-10}
        >
          <CheckCircle color="primary" style={{ width: 40, height: 40 }} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1.5}
        >
          <Avatar
            selected={selected}
            src={player.avatarUrl}
            // can't seem to set these props with styled-components for some reason 🙁
            style={{ width: 80, height: 80 }}
            onClick={onSelect}
          />
          <Box>
            <Box className="player-nickname-label" fontSize="h3.fontSize">
              {player.nickname}
            </Box>
            <Box
              className="player-like-count-label"
              fontFamily="Roboto"
              fontSize="h6.fontSize"
              textAlign="right"
              mt={-0.5}
            >
              {player.likeCount}
            </Box>
          </Box>
        </Box>
        <Box
          className="player-message"
          fontFamily="Roboto"
          fontSize="body1.fontSize"
          px={1.5}
        >
          {player.message}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
