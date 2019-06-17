import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/styles';

import Flag from 'react-world-flags';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  // display: flex;
  // flex-direction: column;
  width: 320px;
  min-height: 200px;
  margin: ${({ theme }) => `${theme.spacing(0.5)}px`};
`;

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
      <StyledCard>
        <CardActionArea>
          <CardContent>
            <Box
              display="flex"
              justifyContent="flex-start"
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
                {/* <Flag code={player.country} height={22} width={32} /> */}
              </Typography>
            </Box>
            <Typography className="message" variant="caption">
              {player.message}
            </Typography>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </ThemeProvider>
  );
};
