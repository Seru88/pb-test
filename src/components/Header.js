import { Box, Typography } from '@material-ui/core';

import React from 'react';
import styled from 'styled-components';

const Message = styled(Typography)`
  color: #b4b7ba;
`;

export default () => {
  return (
    <Box color="blue" bgcolor="white" pt={2} px={3} >
      <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
        Vote for players to represent your region's team
      </Typography>
      <Message variant="subtitle1" align="center">
        The top 3 vote earners in each region make up that region's team.
      </Message>
    </Box>
  );
};
