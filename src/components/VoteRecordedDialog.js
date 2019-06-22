import { Box, Dialog, Typography } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import React from 'react';
import Slide from '@material-ui/core/Slide';
import { SocialIcon } from 'react-social-icons';
import StyledButton from './StyledButton';
import { useTheme } from '@material-ui/styles';

const DialogBase = styled(Box)`
  background-color: white;
  border-radius: 25px;
  width: 600px;
  height: 400px;

  ${({ theme }) => `${theme.breakpoints.down('sm')}`} {
    width: 450px;
    height: 375px;
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const social = [
  'https://www.twitch.tv/',
  'https://www.facebook.com/',
  'https://twitter.com/',
  'https://www.instagram.com/?hl=en',
];

export default ({ open, onClose }) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      PaperComponent={DialogBase}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Box maxWidth={600} maxHeight={400} p={6}>
        <Typography
          variant="h3"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          VOTES RECORDED!
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
          style={{ fontFamily: 'Roboto' }}
          gutterBottom
        >
          Thank you for participating{' '}
          <strong>
            <u>Username</u>
          </strong>
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
          style={{ fontFamily: 'Roboto' }}
          gutterBottom
        >
          Help your teams get the upper hand and tell your friends to vote for
          them too!
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
          style={{ fontFamily: 'Roboto' }}
        >
          <strong>*Voting closes August 14th, 2019 at 12:00AM.</strong>
        </Typography>
        <Box
          margin="0 auto"
          display="flex"
          maxWidth={400}
          justifyContent="space-around"
          alignContent="center"
        >
          {social.map((site, i) => (
            <Box key={i} my={2}>
              <SocialIcon
                url={site}
                target="_blank"
                style={{ width: 75, height: 75 }}
              />
            </Box>
          ))}
        </Box>
        <Box margin="0 auto" width={175}>
          <StyledButton width="100%" height={34} onClick={onClose}>
            CLOSE
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
    </ThemeProvider>
  );
};
