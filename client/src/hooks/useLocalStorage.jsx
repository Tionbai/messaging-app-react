import { useState, useEffect } from 'react';

// useLocalStorage custom hook to handle storing data from the application to local storage.

// Add prefix to stored data to separate this application from other local storage data.
const PREFIX = 'messaging-app-react-';

export default function useLocalStorage(key, initialValue) {
  // Take PREFIX and key from different parts of the application to save to local storage.
  const prefixedKey = PREFIX + key;
  // Get data from local storage if it exists, and then continue with operation.
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  // Set new data to local storage.
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
