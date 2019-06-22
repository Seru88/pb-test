import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import React from 'react';
import StyledButton from './StyledButton';
import { useTheme } from '@material-ui/core/styles';

const Label = styled(Grid)`
  padding-top: ${({ theme }) => `${theme.spacing(1.5)}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing(1.5)}px`};
`;

const StyledAvatar = styled(Avatar)`
  transition: ${({ theme }) => theme.transitions.create(['border'])};
  border: ${({ theme, chosen }) =>
    chosen ? `4px solid ${theme.palette.primary.main}` : `none`};
`;

export default ({ players, onSubmit }) => {
  const theme = useTheme();

  const selections = [];
  for (let i = 0; i < 3; i++) {
    const avatar = (
      <Grid key={i} item xs={3} md={2}>
        <Box height="100%" display="flex" alignItems="center">
          <StyledAvatar
            style={{ width: 50, height: 50 }}
            src={players[i] ? players[i].avatarUrl : ''}
            chosen={players.length > i ? 1 : 0}
          >
            ???
          </StyledAvatar>
          <Typography
            style={{ paddingLeft: theme.spacing(1) }}
            variant="h6"
            color="textSecondary"
          >
            {players.length > i ? players[i].nickname : `Player ${i+1}`}
          </Typography>
        </Box>
      </Grid>
    );
    selections.push(avatar);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        height={{ sm: 180, md: 73 }}
        width="100%"
        position="sticky"
        bottom={0}
        bgcolor="white"
        zIndex={15}
      >
        <Grid container justify="center" alignContent="space-between">
          <Label item xs={12} md={3}>
            <Typography align="center" color="textSecondary" variant="h6">
              Casting a vote for:
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              style={{ color: '#b4b7ba', marginTop: -10 }}
            >
              *CANNOT vote accross regions.
            </Typography>
          </Label>
          {selections}
          <Grid item xs={12} md={2}>
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              p={2}
              justifyContent="center"
            >
              <StyledButton
                selected={players.length === 3}
                onClick={onSubmit}
                width={175}
                height={34}
              >
                SUBMIT
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
