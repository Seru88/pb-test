import { Box } from '@material-ui/core';
import Header from './components/Header';
import React from 'react';
import VotingContainer from './container/VotingContainer';

export default () => {
  return (
    <Box>
      <Header />
      <main>
        <VotingContainer />
      </main>
    </Box>
  );
};
