import { Box, Grid, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import React from 'react';
import { useTheme } from '@material-ui/styles';

const Container = styled(Grid)`
  max-width: 720px;
  margin: 0 auto;
`;
const StyledButton = styled.button`
  outline: none;
  transition: ${({ theme }) =>
    theme.transitions.create(['background-color', 'border', 'color'])};
  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : 'white'};
  border-radius: 25px;
  border: 2px solid;
  border-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : 'black'}
  color: ${({ selected }) => (selected ? 'white' : 'black')}
  height: 32px;
  width: 100%;
  padding: 0 10px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
`;

const initalState = {
  sea: false,
  jp: false,
  tw: false,
  hk: false,
};

function reducer(state = null, action) {
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

export default ({ setRegion }) => {
  const theme = useTheme();
  const [state, dispatch] = React.useReducer(reducer, initalState);
  const onRegionSelect = region => () => {
    setRegion(region);
    dispatch({ type: region });
  };
  const regions = Object.keys(initalState);

  return (
    <ThemeProvider theme={theme}>
      <Box className="background" bgcolor="white" pt={0.5} pb={2}>
        <Container container>
          {regions.map((region, i) => (
            <Grid key={i} item xs={6} md={3}>
              <Box display="flex" justifyContent="center" m={1}>
                <Typography
                  component={StyledButton}
                  selected={state[region]}
                  onClick={onRegionSelect(region)}
                >
                  {getButtonLabel(region)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
};
