import { Avatar, Box, Fade } from '@material-ui/core';
import { darken, fade } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';

import CheckCircle from '@material-ui/icons/CheckCircle';
import React from 'react';
import TextTruncate from 'react-text-truncate';
import Truncate from 'react-truncate';
import { useTheme } from '@material-ui/styles';

// only define custom behaviour
const Card = styled(Box)`
  transition: ${({ theme }) =>
    theme.transitions.create(['background-color', 'box-shadow', 'border'])};
  background-color: ${({ theme, selected }) =>
    selected
      ? darken(theme.palette.background.paper, 0.2)
      : theme.palette.background.paper};
  border: ${({ theme, selected }) =>
    selected
      ? `4px solid ${theme.palette.primary.main}`
      : `4px solid ${theme.palette.background.paper}`} 
  &:hover {
    background-color: ${({ theme }) =>
      darken(theme.palette.background.paper, 0.2)};
    border-color: ${({ theme, selected }) =>
      selected
        ? darken(theme.palette.primary.main, 0.2)
        : darken(theme.palette.background.paper, 0.2)}; 
  }
  &:active {
    background-color: ${({ theme }) =>
      darken(theme.palette.background.paper, 0.2)};
    border-color: ${({ theme }) => darken(theme.palette.primary.main, 0.3)};
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
      <Card
        className="player-card"
        selected={selected}
        width={320}
        // minHeight={200}
        m={1.25}
        p={2}
        boxShadow={3}
        borderRadius={25}
        position="relative"
        onClick={onSelect}
      >
        <Fade in={selected}>
          <Box
            className="checkmark-wrapper"
            width={40}
            height={40}
            borderRadius={25}
            bgcolor="#fff"
            position="absolute"
            top={-20}
            left={-20}
            zIndex={10}
          >
            <CheckCircle color="primary" style={{ width: 40, height: 40 }} />
          </Box>
        </Fade>
        <Box
          className="flag-wrapper"
          position="absolute"
          top={80}
          left={80}
          zIndex={10}
        >
          <Box className={`famfamfam-flags ${player.country}`} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1.5}
        >
          <Box>
            <Avatar
              selected={selected}
              src={player.avatarUrl}
              // can't seem to set these props with styled-components for some reason 🙁
              style={{ width: 80, height: 80 }}
            />
          </Box>
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
          // px={1.5}
          // maxTextLine={3}
          // whiteSpace="nowrap"
          // overflow="hidden"
          // textOverflow="ellipsis"
        >
          {/* <Truncate lines={3} ellipsis="...">
            {player.message}
          </Truncate> */}
          <TextTruncate
            line={3}
            truncateText="…"
            text={player.message}
            textTruncateChild={<a href="#">Read on</a>}
          />
        </Box>
      </Card>
    </ThemeProvider>
  );
};
