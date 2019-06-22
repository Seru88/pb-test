import { Box, Dialog, Typography } from '@material-ui/core';

import React from 'react';
import Slide from '@material-ui/core/Slide';
import { SocialIcon } from 'react-social-icons';
import StyledButton from './StyledButton';
import styled from 'styled-components';

const DialogBase = styled(Box)`
  background-color: white;
  border-radius: 25px;
  width: 600px;
  height: 400px;
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
  return (
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
        <Box
          textAlign="center"
          fontSize="1.8rem"
          color="text.secondary"
          fontFamily="Roboto"
        >
          Thank you for participating{' '}
          <strong>
            <u>Username</u>
          </strong>
        </Box>
        <Box
          textAlign="center"
          fontSize="1.8rem"
          color="text.secondary"
          fontFamily="Roboto"
          mt={1}
        >
          Help your teams get the upper hand and tell your friends to vote for
          them too!
        </Box>
        <Box
          textAlign="center"
          fontSize="1.8rem"
          color="text.secondary"
          fontFamily="Roboto"
          mt={1}
        >
          <strong>*Voting closes August 14th, 2019 at 12:00AM.</strong>
        </Box>
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
  );
};
