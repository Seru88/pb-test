import React from 'react';

export default function useForceUpdate() {
  const [value, set] = React.useState(true);
  return () => set(!value);
}
