'use client';
import { persist } from '@/utilities/persist';
import { ReactNode, createContext, useState } from 'react';

export const TabContext = createContext({
  tab: 'movie',
  setTab: (type: 'movie' | 'tv') => {},
});

const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState(persist.getSessionStorage('tab') || 'movie');

  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
};

export default TabProvider;
