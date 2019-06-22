import React from 'react';
export default function useStateWithSessionStorage(localStorageKey) {
  const [value, setValue] = React.useState(
    sessionStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    sessionStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
}
