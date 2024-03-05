'use client';
import { persist } from '@/utilities/persist';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const TabContext = createContext({
  tab: 'movie',
  setTab: (type: 'movie' | 'tv') => {},
});

const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState('movie');
  const saved = persist.getSessionStorage('tab');

  useEffect(() => {
    if (saved) setTab(saved);
  }, []);

  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
};

export default TabProvider;
