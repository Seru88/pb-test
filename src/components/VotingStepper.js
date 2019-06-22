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

  return (
    <ThemeProvider theme={theme}>
      <Box
        height={{ sm: 180,  md:73}}
        width="100%"
        position="sticky"
        bottom={0}
        bgcolor="white"
        zIndex={15}
      >
        <Grid container justify="center" alignContent="space-between">
          <Label item xs={12} md={3}>
            <Box fontSize="2.2rem" textAlign="center" color="text.secondary">
              Casting a vote for:
            </Box>
            <Box
              fontSize="1.65rem"
              textAlign="center"
              mt={-1}
              color="#b4b7ba"
            >
              *CANNOT vote accross regions.
            </Box>
          </Label>
          <Grid item xs={3} md={2}>
            <Box height="100%" display="flex" alignItems="center">
              <StyledAvatar
                style={{ width: 50, height: 50 }}
                src={players[0] ? players[0].avatarUrl : ''}
                chosen={players.length >= 1 ? 1 : 0}
              >
                ???
              </StyledAvatar>
              <Typography
                style={{ paddingLeft: theme.spacing(1) }}
                variant="h6"
                color="textSecondary"
              >
                {players.length >= 1 ? players[0].nickname : 'Player 1'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} md={2}>
            <Box height="100%" display="flex" alignItems="center">
              <StyledAvatar
                style={{ width: 50, height: 50 }}
                src={players[1] ? players[1].avatarUrl : ''}
                chosen={players.length >= 2 ? 1 : 0}
              >
                ???
              </StyledAvatar>
              <Typography
                style={{ paddingLeft: theme.spacing(1) }}
                variant="h6"
                color="textSecondary"
              >
                {players.length >= 2 ? players[1].nickname : 'Player 2'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} md={2}>
            <Box height="100%" display="flex" alignItems="center">
              <StyledAvatar
                style={{ width: 50, height: 50 }}
                src={players[2] ? players[2].avatarUrl : ''}
                chosen={players.length >= 3 ? 1 : 0}
              >
                ???
              </StyledAvatar>
              <Typography
                style={{ paddingLeft: theme.spacing(1) }}
                variant="h6"
                color="textSecondary"
              >
                {players.length >= 3 ? players[2].nickname : 'Player 3'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box height="100%" display="flex" alignItems="center" p={2} justifyContent="center">
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
