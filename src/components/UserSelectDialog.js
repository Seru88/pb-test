import styled, { ThemeProvider } from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';

const users = ['user', 'guest', 'admin'];

const DialogBase = styled(Box)`
  background-color: white;
  color: black;
  border-radius: 25px;
  width: 230px;
  height: 275px;
  text-align: center;
`;

export default props => {
  const { onClose, onSelect, selectedValue, ...other } = props;
  const theme = useTheme();
  function handleClose() {
    onClose(false);
  }

  function handleListItemClick(value) {
    if (value === '') return;
    onSelect(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        onClose={handleClose}
        PaperComponent={DialogBase}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Switch Account</DialogTitle>
        <List>
          {users.map(user => (
            <ListItem
              button
              onClick={() => handleListItemClick(user)}
              key={user}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                  <PersonIcon style={{ color: 'white' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </ThemeProvider>
  );
};
