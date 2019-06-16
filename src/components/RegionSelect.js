import { Box, Button, Grid } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import React from 'react';

const Root = styled(Grid)`
  max-width: 650px;
  margin: 0 auto;
`;
const StyledButton = styled(Button)`
  width: 139px;
  height: 30px;
`;

export default ({setRegion}) => {
  
  const onRegionSelect = region => () => {
    setRegion(region);
  }
  
  return (
    <Root container>
      <Grid item xs={6} md={3}>
        <Box display="flex" justifyContent="center" m={1} >
          <StyledButton variant="contained" size="small" onClick={onRegionSelect('sea')}>
            South East Asia
          </StyledButton>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box display="flex" justifyContent="center" m={1}>
          <StyledButton variant="contained" size="small" onClick={onRegionSelect('jp')}>
            Japan
          </StyledButton>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box display="flex" justifyContent="center" m={1}>
          <StyledButton variant="contained" size="small" onClick={onRegionSelect('tw')}>
            Taiwan
          </StyledButton>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box display="flex" justifyContent="center" m={1}>
          <StyledButton variant="contained" size="small" onClick={onRegionSelect('hk')}>
            Hong Kong
          </StyledButton>
        </Box>
      </Grid>
    </Root>
  );
};
