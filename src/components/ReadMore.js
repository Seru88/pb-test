import { Box, Collapse, Typography } from '@material-ui/core';

import React from 'react';
import Truncate from 'react-truncate';

const defaultLines = 4;

export default ({ children, less, more }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [lines, setLines] = React.useState(defaultLines);

  React.useEffect(() => {
    if (expanded) setLines(0);
    else setLines(4);
  }, [expanded]);

  return (
    <Collapse
      in={expanded}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      collapsedHeight="75px"
    >
      <Box>
        <Typography
          component={Truncate}
          lines={lines}
          ellipsis="..."
          variant="body2"
          style={{ fontFamily: 'Roboto' }}
        >
          {children}
        </Typography>
      </Box>
    </Collapse>
  );
};
