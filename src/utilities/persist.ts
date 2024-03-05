const getSessionStorage = (key: string) => {
  const value = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
  if (!value) return null;
  return JSON.parse(value);
};

const setSessionStorage = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const persist = { getSessionStorage, setSessionStorage };
