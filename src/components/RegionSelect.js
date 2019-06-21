import { Box, Grid } from '@material-ui/core';

import React from 'react';
import StyledButton from './StyledButton';
import styled from 'styled-components';
import { useTheme } from '@material-ui/styles';

const Container = styled(Grid)`
  max-width: 720px;
  margin: 0 auto;
`;

const initalState = {
  sea: false,
  jp: false,
  tw: false,
  hk: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'sea':
      return { ...initalState, sea: true };
    case 'jp':
      return { ...initalState, jp: true };
    case 'tw':
      return { ...initalState, tw: true };
    case 'hk':
      return { ...initalState, hk: true };
    default:
      break;
  }
}

function getButtonLabel(regionCode) {
  if (regionCode === 'sea') return 'South East Asia'.toUpperCase();
  if (regionCode === 'jp') return 'Japan'.toUpperCase();
  if (regionCode === 'tw') return 'Taiwan'.toUpperCase();
  if (regionCode === 'hk') return 'Hong Kong'.toUpperCase();
}

export default ({ onSelect }) => {
  const theme = useTheme();
  const [state, dispatch] = React.useReducer(reducer, initalState);
  const onRegionSelect = region => () => {
    onSelect(region);
    dispatch({ type: region });
  };
  const regions = Object.keys(initalState);

  return (
    <Box className="background" bgcolor="white" pt={0.5} pb={2}>
      <Container container>
        {regions.map((region, i) => (
          <Grid key={i} item xs={6} md={3}>
            <Box display="flex" justifyContent="center" m={1}>
              <StyledButton
                selected={state[region]}
                onClick={onRegionSelect(region)}
                width="100%"
              >
                {getButtonLabel(region)}
              </StyledButton>
            </Box>
          </Grid>
        ))}
      </Container>
    </Box>
  );
};
