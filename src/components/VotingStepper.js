import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import React from 'react';
import { useTheme } from '@material-ui/core/styles';

const Label = styled(Grid)`
  padding-top: ${({ theme }) => `${theme.spacing(1.5)}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing(1.5)}px`};
`;

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
              *One vote per region.
            </Box>
          </Label>
          {/* <Grid item md={3}>
            <Avatar src={candidates.avatarUrl} />
          </Grid> */}
          {candidates.map((player, i) => (
            <Grid key={i} item md={3}>
              <Avatar src={player.avatarUrl} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
