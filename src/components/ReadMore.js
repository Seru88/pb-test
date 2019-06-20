import { Box } from '@material-ui/core';
import React from 'react';
import TextTruncate from 'react-text-truncate';

// import Truncate from 'react-truncate';

const defaultLines = 4;

export default ({ children, less, more }) => {
  // const [expanded, setExpanded] = React.useState(false);
  // const [isTruncated, setTruncated] = React.useState(false);
  const [lines, setLines] = React.useState(defaultLines);

  // const handleTruncate = truncated => {
  //   if (isTruncated !== truncated) {
  //     setTruncated(truncated);
  //   }
  // };

  const unCollapseLines = event => {
    event.preventDefault();
    setLines(0);
    
  };

  const collapseLines = event => {
    event.preventDefault();
    setLines(defaultLines);
  }

  return (
    
    <Box
      onMouseEnter={unCollapseLines}
      onMouseLeave={collapseLines}
    >
      {/* <Truncate
        lines={!expanded && lines}
        ellipsis={
          <span>
            ...{' '}
            <a href="#" onClick={toggleLines}>
              {more}
            </a>
          </span>
        }
        onTruncate={handleTruncate}
      >
        {children}
      </Truncate> */}
      <TextTruncate
        line={lines}
        truncateText="…"
        text={children}
        textTruncateChild={<a style={{float: 'right'}} href="#">Read on</a>}
      />
    </Box>
  );
};

