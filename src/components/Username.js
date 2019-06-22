import { Box } from '@material-ui/core';
import { MyContext } from '../App';
import React from 'react';

export default ({onClick}) => {
  const {user} = React.useContext(MyContext);
  const handleClick = () => {
    // call back to open the user select dialog
    onClick(true);
  }
  return (
    <Box component="button" color="black" position="fixed" top={0} onClick={handleClick} >
      {user}
    </Box>
  );
};
