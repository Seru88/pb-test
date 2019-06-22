import { Box, Collapse, IconButton, Typography } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextTruncate from 'react-text-truncate';

const defaultLines = 4;

export default ({ children, less, more }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [lines, setLines] = React.useState(defaultLines);

  React.useEffect(() => {
    if (expanded) setLines(0);
    else setLines(3);
  }, [expanded]);

  return (
    <Collapse
      in={expanded}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      collapsedHeight="55px"
    >
      <Box fontSize="">
        <TextTruncate
          line={lines}
          truncateText="…"
          text={children}
          // textTruncateChild={
          //   <a style={{ float: 'right' }} href="#">
          //     Read on
          //   </a>
          // }
        />
      </Box>
    </Collapse>
  );
};
