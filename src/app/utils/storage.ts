import { useState } from 'react';

export function getJSONItem<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
}

export function setJSONItem<T>(key: string, item: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(e);
  }
}

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((value: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      return getJSONItem(key) || initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  function setValue(value: T | ((value: T) => T)) {
    try {
      const valueToStore =
        typeof value === 'function' ? (value as (value: T) => T)(state) : value;
      setJSONItem<T>(key, valueToStore);
      setState(valueToStore);
    } catch (e) {
      console.error(e);
    }
  }

  return [state, setValue];
}
