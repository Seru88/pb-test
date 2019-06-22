import { Box, Grid } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import { MyContext } from '../App';
import React from 'react';
import StyledButton from './StyledButton';
import { useTheme } from '@material-ui/core/styles';

const Container = styled(Grid)`
  max-width: 720px;
  margin: 0 auto;

  ${({ theme }) => `${theme.breakpoints.down('sm')}`} {
    button {
      width: 175px;
    }
  }
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
    case 'reset':
      return initalState;
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

export default ({ onSelect, onVotingClose, players }) => {
  const [state, dispatch] = React.useReducer(reducer, initalState);
  const theme = useTheme();

  const {user} = React.useContext(MyContext);

  const onRegionSelect = region => () => {
    onSelect(region);
    dispatch({ type: region });
  };

  const regions = Object.keys(initalState);
  React.useEffect(() => {
    if (players === null) {
      dispatch({ type: 'reset' });
    }
  }, [players]);
  return (
    <Box className="background" bgcolor="white" pt={0.5} pb={2}>
      <ThemeProvider theme={theme}>
        <Container container>
          {regions.map((region, i) => (
            <Grid key={i} item xs={6} md={3}>
              <Box display="flex" justifyContent="center" m={1}>
                <StyledButton
                  selected={state[region]}
                  onClick={onRegionSelect(region)}
                  width="100%"
                  height={34}
                >
                  {getButtonLabel(region)}
                </StyledButton>
              </Box>
            </Grid>
          ))}
          {user === 'admin' ? (
            <Box margin="0 auto" mt={2} width={250} height={34}>
              <StyledButton
                width="100%"
                height="100%"
                onClick={onVotingClose}
              >
                CLOSE VOTING SESSION
              </StyledButton>
            </Box>
          ) : null}
        </Container>
      </ThemeProvider>
    </Box>
  );
};
