import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import React from 'react';
import { useTheme } from '@material-ui/core/styles';

const Label = styled(Grid)`
  padding-top: ${({ theme }) => `${theme.spacing(1.5)}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing(1.5)}px`};
`;

const intialState = [
  { nickname: 'Player 1' },
  { nickname: 'Player 2' },
  { nickname: 'Player 3' },
];

export default ({ candidates }) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box
        height={73}
        width="100%"
        position="sticky"
        bottom={0}
        bgcolor="white"
        zIndex={15}
      >
        <Grid container justify="center">
          <Label item md={3}>
            <Box fontSize="2.2rem" textAlign="center" color="text.secondary">
              Casting a vote for:
            </Box>
            <Box
              fontSize="1.65rem"
              color="secondary.main"
              textAlign="center"
              mt={-1}
              color="#b4b7ba"
            >
              *Can only vote for one region.
            </Box>
          </Label>
          {candidates.map((player, i, array) => (
            <Grid>
              <Box height="100%" display="flex" alignItems="center">
                <Avatar />
                <Typography
                  style={{ paddingLeft: theme.spacing(1) }}
                  variant="h6"
                  color="textSecondary"
                >
                  {array.length > i ? candidates[i].nickname : 'Player 1'}
                </Typography>
              </Box>
            </Grid>
          ))}
          <Grid item md={3}>
            <Box height="100%" display="flex" alignItems="center">
              <Avatar />
              <Typography
                style={{ paddingLeft: theme.spacing(1) }}
                variant="h6"
                color="textSecondary"
              >
                {candidates.length >= 1 ? candidates[0].nickname : 'Player 1'}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box height="100%" display="flex" alignItems="center">
              <Avatar />
              <Typography
                style={{ paddingLeft: theme.spacing(1) }}
                variant="h6"
                color="textSecondary"
              >
                {candidates.length >= 2 ? candidates[1].nickname : 'Player 2'}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box height="100%" display="flex" alignItems="center">
              <Avatar />
              <Typography
                style={{ paddingLeft: theme.spacing(1) }}
                variant="h6"
                color="textSecondary"
              >
                {candidates.length >= 3 ? candidates[2].nickname : 'Player 3'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
