import React, { Component } from 'react';

import Truncate from 'react-truncate';
import useForceUpdate from '../hooks/useForceUpdate';

export default ({ children, lines, less, more }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isTruncated, setTruncated] = React.useState(false);

  const forceUpdate = useForceUpdate();
  
  const handleTruncate = truncated => {
    if (isTruncated !== truncated) {
      setTruncated(truncated);
    }
  };

  const toggleLines = event => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    forceUpdate();
  }, [])

  return (
    <div>
      <Truncate
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
      </Truncate>
      {!isTruncated && expanded && (
        <span>
          {' '}
          <a href="#" onClick={toggleLines}>
            {less}
          </a>
        </span>
      )}
    </div>
  );
};

class ReadMore extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      expanded: false,
      truncated: false,
    };

    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  }

  toggleLines(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { children, more, less, lines } = this.props;

    const { expanded, truncated } = this.state;

    return (
      <div>
        <Truncate
          lines={!expanded && lines}
          ellipsis={
            <span>
              ...{' '}
              <a href="#" onClick={this.toggleLines}>
                {more}
              </a>
            </span>
          }
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            {' '}
            <a href="#" onClick={this.toggleLines}>
              {less}
            </a>
          </span>
        )}
      </div>
    );
  }
}
