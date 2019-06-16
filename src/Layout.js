import { Box, Button, Container, Grid } from '@material-ui/core';

import Header from './components/Header';
import React from 'react';
import VotingContainer from './container/VotingContainer';

export default () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Header />
      </Container>
      <main>
        <VotingContainer />
      </main>
    </Box>
  );
};
